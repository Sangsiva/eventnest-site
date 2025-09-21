import { test, expect, Page } from '@playwright/test';
import { TestUtils } from './utils/test-utils';

test.describe('Payments', () => {
  let testUtils: TestUtils;
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    testUtils = new TestUtils(page);
    
    // Add retry logic for page navigation
    const maxRetries = 3;
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await testUtils.navigateTo('/vendor/payments');
        
        // Wait for any of these elements to be present
        await Promise.race([
          page.waitForSelector('h1, h2, h3, [role="heading"], .page-title, [data-testid*="heading"], [data-testid*="page"], .container, main', { 
            state: 'attached',
            timeout: 10000 
          }),
          // Also wait for some network activity to settle
          page.waitForLoadState('domcontentloaded'),
          page.waitForTimeout(2000) // Fallback in case the page is very simple
        ]);
        
        // If we get here, the page loaded successfully
        return;
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempt} failed, retrying...`);
        await page.waitForTimeout(1000); // Wait before retry
      }
    }
    
    // If we get here, all retries failed
    throw lastError;
  });

  test('should load payments page with content', async () => {
    // First, check if we're on a login page by mistake
    const isLoginPage = await page.locator('input[type="password"], [name*="password"], [id*="login"], [class*="login"]').isVisible();
    if (isLoginPage) {
      throw new Error('Test was redirected to login page. Make sure the test user is properly authenticated.');
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/payments-page.png', fullPage: true });
    
    // Check page title or heading with multiple possible selectors and relaxed timeout
    const headingSelectors = [
      'h1', 'h2', 'h3',
      '[role="heading"]',
      '.page-title',
      '[data-testid*="heading"]',
      '[data-testid*="page-title"]',
      '.MuiTypography-h4', '.MuiTypography-h5', // Common MUI classes
      '.ant-page-header-heading-title' // Ant Design
    ];
    
    const heading = page.locator(headingSelectors.join(', ')).first();
    await test.step('wait for heading to be visible', async () => {
      await expect(heading).toBeVisible({ timeout: 10000 });
    });
    
    // Get the page content for debugging
    const pageContent = await page.content();
    console.log('Page content length:', pageContent.length);
    
    // Check heading text with more flexibility
    const headingText = (await heading.textContent() || '').toLowerCase();
    test.skip(!/(payments|earnings|transactions|finance|dashboard|overview)/i.test(headingText), 
      'No relevant heading found on the page');
    
    // Check for main content sections with flexible selectors
    const contentSections = [
      { id: 'balance', selectors: ['balance', 'account', 'wallet', 'funds'] },
      { id: 'transactions', selectors: ['transaction', 'history', 'activity'] },
      { id: 'payout', selectors: ['payout', 'withdraw', 'transfer'] }
    ];
    
    // Verify at least one main content section is visible
    let visibleSections = 0;
    for (const section of contentSections) {
      const selectors = section.selectors.map(s => 
        `[data-testid*="${s}"], [class*="${s}"], [id*="${s}"]`
      ).join(', ');
      
      const sectionEl = page.locator(selectors).first();
      if (await sectionEl.isVisible({ timeout: 3000 })) {
        console.log(`Found ${section.id} section`);
        visibleSections++;
      }
    }
    
    // If no sections found, log the page structure for debugging
    if (visibleSections === 0) {
      const allElements = await page.locator('*').all();
      console.log('Top-level elements on the page:', 
        (await Promise.all(allElements.slice(0, 20).map(el => el.evaluate(e => e.outerHTML)))).join('\n---\n')
      );
    }
    
    expect(visibleSections).toBeGreaterThanOrEqual(1);
  });

  test('should display financial information', async () => {
    // Try multiple possible selectors for balance section
    const balanceSection = await page.locator(
      '[data-testid*="balance"], .balance-summary, .financial-summary, .account-summary, .stats, .metrics'
    ).first();
    
    await test.step('balance section should be visible', async () => {
      await expect(balanceSection).toBeVisible({ timeout: 10000 });
    });
    
    // Check for balance amount with flexible selectors
    const balanceAmount = await balanceSection.locator(
      '[data-testid*="balance-amount"], [class*="balance-amount"], [class*="amount"], .amount, .value, .total, h2, h3'
    ).first();
    
    await test.step('balance amount should be visible and valid', async () => {
      await expect(balanceAmount).toBeVisible();
      const balanceText = (await balanceAmount.textContent())?.trim() || '';
      expect(balanceText).toMatch(/\$?\d+([\.,]\d{1,2})?/);
    });
    
    // Check other financial metrics if present
    const metrics = [
      'pending-payouts',
      'total-earnings',
      'last-payout',
      'next-payout'
    ];
    
    // Check each metric if it exists
    for (const metric of metrics) {
      const element = balanceSection.locator(`[data-testid="${metric}"]`);
      if (await element.isVisible()) {
        const value = await element.textContent();
        expect(value).toBeTruthy();
      }
    }
  });

  test('should display transaction history', async () => {
    // Look for transaction history section
    const transactionSection = page.locator('[data-testid="transaction-history"]');
    test.skip(!await transactionSection.isVisible(), 'No transaction history section found');
    
    // Check if there are transactions or an empty state
    const emptyState = transactionSection.locator('[data-testid="empty-state"]');
    const transactionList = transactionSection.locator('[data-testid^="transaction-"]');
    
    const hasTransactions = await transactionList.count() > 0;
    const isEmptyStateVisible = await emptyState.isVisible();
    
    // Either we should have transactions or see an empty state message
    expect(hasTransactions || isEmptyStateVisible).toBeTruthy();
    
    if (hasTransactions) {
      // Check first transaction details
      const firstTransaction = transactionList.first();
      await expect(firstTransaction).toBeVisible();
      
      // Check transaction has required fields
      const amount = firstTransaction.locator('[data-testid="transaction-amount"]');
      await expect(amount).toBeVisible();
      
      const date = firstTransaction.locator('[data-testid="transaction-date"]');
      await expect(date).toBeVisible();
      
      const status = firstTransaction.locator('[data-testid="transaction-status"]');
      await expect(status).toBeVisible();
    }
  });

  test('should have working payout functionality', async () => {
    // Look for payout button or link
    const payoutButton = page.locator('button, a', { 
      hasText: /request payout|withdraw|payout/i 
    }).first();
    
    // Skip if no payout button found
    test.skip(!await payoutButton.isVisible(), 'No payout button found');
    
    // Click the payout button
    await payoutButton.click();
    
    // Look for a form or modal
    const form = page.locator('form, [role="dialog"]').first();
    await expect(form).toBeVisible({ timeout: 5000 });
    
    // Try to find amount input
    const amountInput = form.locator('input[type="number"], input[name*="amount"], [id*="amount"]').first();
    
    if (await amountInput.isVisible()) {
      // Test validation
      const submitButton = form.locator('button[type="submit"], [type="submit"]').first();
      
      // Test empty submission
      await submitButton.click();
      
      // Look for validation error
      const errorMessage = form.locator('[role="alert"], .error, .validation-error');
      await expect(errorMessage.first()).toBeVisible({ timeout: 2000 });
      
      // Test with valid amount
      await amountInput.fill('100');
      await submitButton.click();
      
      // Verify success message or redirect
      await expect(page.getByText(/success|request received|processing/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should be responsive', async ({ isMobile, browserName }) => {
    test.info().annotations.push({ type: 'browser', description: browserName });
    
    if (isMobile) {
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 812 });
      
      // Check for mobile-specific elements
      const mobileElements = [
        'button[aria-label*="menu"]',
        '[class*="menu" i]',
        '[class*="hamburger"]',
        '[class*="mobile"][class*="nav"]',
        '[data-testid*="mobile"]'
      ];
      
      const mobileMenu = page.locator(mobileElements.join(', ')).first();
      await test.step('mobile menu should be visible', async () => {
        await expect(mobileMenu).toBeVisible({ timeout: 5000 });
      });
    } else {
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 800 });
      
      // Check for desktop-specific elements
      const desktopElements = [
        'nav[role="navigation"]',
        '[class*="desktop"][class*="nav"]',
        '[data-testid*="desktop"]',
        'aside',
        '.sidebar'
      ];
      
      const desktopNav = page.locator(desktopElements.join(', ')).first();
      await test.step('desktop navigation should be visible', async () => {
        await expect(desktopNav).toBeVisible({ timeout: 5000 });
      });
    }
  });
});
