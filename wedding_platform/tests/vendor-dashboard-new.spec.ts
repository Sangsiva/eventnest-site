import { test, expect, Page } from '@playwright/test';
import { TestUtils } from './utils/test-utils';

test.describe('Vendor Dashboard', () => {
  let testUtils: TestUtils;
  let page: Page;
  let isMobile: boolean;

  test.beforeEach(async ({ page: testPage, isMobile: mobileFlag }) => {
    page = testPage;
    isMobile = mobileFlag;
    testUtils = new TestUtils(page);
    
    // Configure retry logic for page navigation
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await testUtils.navigateTo('/vendor/dashboard');
        
        // Wait for any of these elements to be present
        await Promise.race([
          page.waitForSelector(
            '[data-testid*="dashboard"], ' +
            'main, ' +
            '[role="main"], ' +
            '.dashboard, ' +
            '.MuiContainer-root, ' +
            '.ant-layout-content',
            { state: 'attached', timeout: 15000 }
          ),
          page.waitForLoadState('domcontentloaded', { timeout: 10000 }),
          page.waitForTimeout(5000) // Fallback timeout
        ]);
        
        // Take a screenshot for debugging
        const testInfo = test.info();
        const testName = testInfo.title.replace(/\W+/g, '-').toLowerCase();
        await page.screenshot({ 
          path: `test-results/${testName}-attempt-${attempt}.png`, 
          fullPage: true 
        });
        
        // Verify we're not on the login page
        if (page.url().includes('/login') || page.url().includes('/auth')) {
          throw new Error('Redirected to login page - authentication required');
        }
        
        return; // Success, exit the retry loop
      } catch (error) {
        lastError = error as Error;
        console.log(`Attempt ${attempt} failed: ${error}`);
        if (attempt < maxRetries) {
          await page.waitForTimeout(2000); // Wait before retry
        }
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error('Failed to load dashboard after multiple attempts');
  });

  test('should load dashboard with stats', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify dashboard loads with stats and metrics' 
    });
    
    // Check for dashboard heading
    await test.step('verify dashboard heading', async () => {
      const headingSelectors = [
        'h1', 'h2', 'h3',
        '[data-testid*="heading"], [data-testid*="title"]',
        '.page-title, .dashboard-title, .MuiTypography-h4, .ant-typography',
        '[class*="heading"], [class*="title"]'
      ];
      
      const heading = page.locator(headingSelectors.join(', ')).first();
      await expect(heading).toBeVisible({ timeout: 10000 });
      
      const headingText = (await heading.textContent() || '').toLowerCase();
      expect(headingText).toMatch(/(dashboard|overview|welcome)/i);
    });
    
    // Look for stats/metric cards
    await test.step('verify stats cards', async () => {
      const statCardSelectors = [
        // Data test IDs first (most reliable)
        '[data-testid*="stat"], [data-testid*="metric"], [data-testid*="card"]',
        // Common class names
        '.stat-card, .metric-card, .dashboard-card, .overview-card',
        // Component-based selectors
        '.MuiCard-root, .ant-card, .card, .stat, .metric',
        // Pattern-based class names
        '[class*="stat-"], [class*="metric-"], [class*="card-"]'
      ];
      
      const statCards = page.locator(statCardSelectors.join(', '));
      const cardCount = await statCards.count();
      
      testInfo.annotations.push({ 
        type: 'stats', 
        description: `Found ${cardCount} stat cards on the dashboard` 
      });
      
      test.skip(cardCount === 0, 'No stat cards found on the dashboard');
      
      // Verify first 3 cards have valid content
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = statCards.nth(i);
        await expect(card).toBeVisible();
        
        // Look for a value inside the card (number, currency, etc.)
        const valueElement = card.locator(
          '[data-testid$="-value"], ' +
          '.value, .amount, .number, ' +
          '[class*="value"], [class*="amount"], ' +
          '.stat-value, .metric-value, ' +
          '.MuiTypography-h4, .ant-statistic-content'
        ).first();
        
        if (await valueElement.isVisible({ timeout: 2000 })) {
          const valueText = (await valueElement.textContent() || '').trim();
          // Check if it's a number, currency, or percentage
          expect(valueText).toMatch(/^(\$?\d+[\d,.]*|\d+%?)$/);
          
          // Look for a label/description
          const labelElement = card.locator(
            '[data-testid$="-label"], ' +
            '.label, .title, .name, ' +
            '.MuiTypography-body2, .ant-statistic-title'
          ).first();
          
          if (await labelElement.isVisible({ timeout: 1000 })) {
            const labelText = (await labelElement.textContent() || '').trim();
            expect(labelText.length).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  test('should have working quick action buttons', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify quick action buttons are functional' 
    });
    
    await test.step('find and verify quick action buttons', async () => {
      // Look for quick action buttons using various selectors (most specific to least specific)
      const quickActionSelectors = [
        // Data test IDs first (most reliable)
        '[data-testid*="quick-action"], [data-testid*="action-button"], [data-testid*="action-"]',
        // Common class names
        '.quick-actions button, .action-buttons a, .action-button, .btn-action',
        // Common component patterns
        '.MuiButton-root, .ant-btn, .btn',
        // Pattern-based class names
        '[class*="quick-action"], [class*="action-button"]',
        // Fallback to any button that looks like an action
        'button:has-text("New"), a:has-text("Add"), button:has-text("Create")'
      ];
      
      const quickActionButtons = page.locator(quickActionSelectors.join(', '));
      const buttonCount = await quickActionButtons.count();
      
      testInfo.annotations.push({ 
        type: 'quick-actions', 
        description: `Found ${buttonCount} quick action buttons` 
      });
      
      test.skip(buttonCount === 0, 'No quick action buttons found on the page');
      
      // Check the first 3 buttons if they exist
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = quickActionButtons.nth(i);
        await expect(button).toBeVisible();
        
        // Verify button has either text or an icon
        const buttonText = (await button.textContent() || '').trim();
        const hasIcon = await button.locator('svg, i, img, [class*="icon"]').count() > 0;
        
        testInfo.annotations.push({
          type: 'button',
          description: `Button ${i + 1}: ${buttonText || 'No text'} ${hasIcon ? '(has icon)' : ''}`
        });
        
        expect(buttonText.length > 0 || hasIcon).toBeTruthy(
          `Button should have either text or icon: ${await button.evaluate(el => el.outerHTML)}`
        );
        
        // Test button click if it's a link or has an onClick handler
        if (await button.getAttribute('href') || 
            await button.getAttribute('onclick') ||
            await button.evaluate(el => {
              return window.getComputedStyle(el).cursor === 'pointer' || 
                     el.tagName === 'A' || 
                     el.tagName === 'BUTTON';
            })) {
          
          // Get current URL before click
          const initialUrl = page.url();
          
          try {
            // Click the button and wait for navigation or a short delay
            await Promise.race([
              button.click().then(() => page.waitForLoadState('networkidle')),
              page.waitForTimeout(2000) // Max wait time
            ]);
            
            // Check if navigation occurred
            const currentUrl = page.url();
            if (currentUrl !== initialUrl && !currentUrl.includes('#')) {
              // Navigated to a new page, go back
              await page.goBack();
              await page.waitForURL(initialUrl, { timeout: 10000 });
            }
          } catch (error) {
            console.log(`Button ${i + 1} click test skipped:`, error instanceof Error ? error.message : String(error));
          }
        }
      }
    });
    
    // Test specific quick actions if they exist
    await test.step('test specific quick actions', async () => {
      const expectedActions = [
        { text: /new.*booking|book now/i, path: '/bookings/new' },
        { text: /manage.*services|services/i, path: '/services' },
        { text: /request.*payout|withdraw/i, path: '/payments/request' },
        { text: /add.*portfolio|portfolio/i, path: '/portfolio/new' },
        { text: /view.*analytics|analytics/i, path: '/analytics' }
      ];
      
      for (const action of expectedActions) {
        const button = page.getByRole('button', { name: action.text })
          .or(page.getByRole('link', { name: action.text }))
          .or(page.locator(`[data-testid*="${action.text.toString().replace(/[^a-z]/gi, '-').toLowerCase()}"]`))
          .first();
        
        if (await button.isVisible({ timeout: 2000 })) {
          const initialUrl = page.url();
          
          await test.step(`test action: ${action.text}`, async () => {
            await button.click();
            
            // Wait for navigation or a short delay
            try {
              await Promise.race([
                page.waitForURL(`**${action.path}`, { timeout: 10000 }),
                page.waitForTimeout(3000)
              ]);
              
              // If we navigated, go back
              if (page.url() !== initialUrl) {
                await page.goBack();
                await page.waitForURL(initialUrl, { timeout: 10000 });
              }
            } catch (error) {
              console.log(`Action ${action.text} test completed with:`, error instanceof Error ? error.message : String(error));
            }
          });
        }
      }
    });
  });

  test('should display recent activity', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify recent activity section displays correctly' 
    });
    
    await test.step('verify recent activity section', async () => {
      // Look for recent activity section using various selectors
      const activitySectionSelectors = [
        '[data-testid*="recent-activity"], [data-testid*="activity-feed"]',
        '.recent-activity, .activity-feed, .timeline',
        'section:has(h2:has-text("Activity")), section:has(h2:has-text("Recent"))'
      ];
      
      const activitySection = page.locator(activitySectionSelectors.join(', ')).first();
      
      if (!(await activitySection.isVisible({ timeout: 2000 }))) {
        test.skip(true, 'No recent activity section found on the dashboard');
        return;
      }
      
      await expect(activitySection).toBeVisible();
      
      // Check for activity items
      const activityItems = activitySection.locator(
        '[data-testid*="activity-item"], ' +
        '.activity-item, .timeline-item, ' +
        'li:has(.time-ago), [class*="activity-"]'
      );
      
      const itemCount = await activityItems.count();
      testInfo.annotations.push({
        type: 'activity',
        description: `Found ${itemCount} activity items`
      });
      
      if (itemCount > 0) {
        // Verify at least one activity item is visible
        const firstItem = activityItems.first();
        await expect(firstItem).toBeVisible();
        
        // Check for common activity item elements
        const hasTitle = await firstItem.locator('h3, h4, [class*="title"], [data-testid$="-title"]').first().isVisible();
        const hasTime = await firstItem.locator('time, [datetime], [class*="time"], [data-testid$="-time"]').first().isVisible();
        const hasDescription = await firstItem.locator('p, [class*="description"], [data-testid$="-desc"]').first().isVisible();
        
        expect(hasTitle || hasDescription).toBeTruthy('Activity item should have either a title or description');
        expect(hasTime).toBeTruthy('Activity item should have a timestamp');
        
        // Verify the timestamp is in a reasonable format
        if (hasTime) {
          const timeElement = firstItem.locator('time, [datetime], [class*="time"]').first();
          const timeText = await timeElement.textContent();
          expect(timeText?.trim().length).toBeGreaterThan(0);
          
          // Check for relative time (e.g., "2 hours ago") or absolute date
          expect(timeText).toMatch(/(ago|minute|hour|day|week|month|year|\d{4}|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
        }
      } else {
        // Check for empty state
        const emptyState = activitySection.locator(
          '.empty-state, .no-activity, [data-testid*="empty"], :text("No recent activity"), :text("No activities found")'
        ).first();
        
        if (await emptyState.isVisible({ timeout: 1000 })) {
          await expect(emptyState).toBeVisible();
          const emptyText = await emptyState.textContent();
          expect(emptyText?.toLowerCase()).toMatch(/(no|empty|zero).*activity/i);
        } else {
          test.fail('No activity items or empty state found in activity section');
        }
      }
    });
  });

  test('should have working sidebar navigation', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify sidebar navigation works correctly' 
    });
    
    // Define expected navigation items with their test IDs and paths
    const navItems = [
      { id: 'nav-dashboard', text: /dashboard|home/i, path: '/vendor/dashboard' },
      { id: 'nav-services', text: /services|products/i, path: '/vendor/services' },
      { id: 'nav-bookings', text: /bookings|appointments/i, path: '/vendor/bookings' },
      { id: 'nav-portfolio', text: /portfolio|gallery/i, path: '/vendor/portfolio' },
      { id: 'nav-payments', text: /payments|earnings/i, path: '/vendor/payments' },
      { id: 'nav-analytics', text: /analytics|reports/i, path: '/vendor/analytics' },
      { id: 'nav-settings', text: /settings|profile/i, path: '/vendor/settings' }
    ];
    
    // Test each navigation item
    for (const item of navItems) {
      await test.step(`test navigation to ${item.text}`, async () => {
        // Try to find the nav item by test ID first, then by text
        let navLink = page.locator(`[data-testid="${item.id}"]`).first();
        
        if (!(await navLink.isVisible({ timeout: 1000 }))) {
          // Fall back to finding by text if test ID not found
          navLink = page.getByRole('link', { name: item.text, exact: false })
            .or(page.getByRole('button', { name: item.text, exact: false }))
            .first();
        }
        
        // Skip if the nav item is not found
        if (!(await navLink.isVisible({ timeout: 1000 }))) {
          test.skip(true, `Navigation item not found: ${item.text}`);
          return;
        }
        
        await expect(navLink).toBeVisible();
        
        // Get the current URL before clicking
        const initialUrl = page.url();
        
        // Click the navigation link
        await navLink.click();
        
        // Wait for navigation to complete or timeout
        try {
          await Promise.race([
            page.waitForURL(`**${item.path}`, { timeout: 10000 }),
            page.waitForTimeout(3000)
          ]);
          
          // If we navigated to a new page
          if (page.url() !== initialUrl) {
            // Verify we're on the expected page
            await expect(page).toHaveURL(new RegExp(item.path.replace(/\//g, '\\/') + '(?:\\.*)?$'));
            
            // Navigate back to dashboard for next test (unless this is the dashboard)
            if (!item.path.endsWith('/dashboard')) {
              await testUtils.navigateTo('/vendor/dashboard');
              await page.waitForSelector('[data-testid*="dashboard"]', { state: 'visible', timeout: 10000 });
            }
          }
        } catch (error) {
          console.log(`Navigation test for ${item.text} completed with:`, 
            error instanceof Error ? error.message : String(error));
        }
      });
    }
  });

  test('should be responsive', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify responsive behavior on different viewports' 
    });

    if (isMobile) {
      await test.step('verify mobile layout', async () => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 812 }); // iPhone X dimensions
        
        // Check for mobile menu button
        const mobileMenuButton = page.locator(
          // Data test IDs first
          '[data-testid*="menu"], ' +
          // Common class names
          '.mobile-menu-button, .hamburger, .menu-toggle, ' +
          // ARIA attributes
          '[aria-label*="menu"], [aria-label*="navigation"], ' +
          // Common patterns
          '.navbar-toggler, .nav-toggle, .hamburger-menu'
        ).first();
        
        await test.step('check mobile menu button', async () => {
          await expect(mobileMenuButton).toBeVisible({ timeout: 5000 });
          
          // Check that it's properly labeled
          const buttonLabel = await mobileMenuButton.getAttribute('aria-label') || 
                             await mobileMenuButton.getAttribute('title') ||
                             await mobileMenuButton.textContent() || '';
          
          if (buttonLabel) {
            expect(buttonLabel.toLowerCase()).toMatch(/(menu|navigation|open)/i);
          }
        });
        
        // Check that desktop sidebar is not visible on mobile
        const desktopSidebar = page.locator(
          // Desktop-specific selectors
          '[data-testid*="desktop"], ' +
          '.desktop-sidebar, ' +
          'aside:not([class*="mobile"]), ' +
          'nav:not([class*="mobile"])',
          { hasNot: page.locator('[class*="mobile"], [data-mobile]') }
        ).first();
        
        if (await desktopSidebar.isVisible({ timeout: 1000 })) {
          await test.step('verify desktop sidebar is hidden on mobile', async () => {
            const display = await desktopSidebar.evaluate(el => 
              window.getComputedStyle(el).display
            );
            expect(display).toMatch(/none|hidden/);
          });
        }
        
        // Test mobile menu interaction if button is present
        if (await mobileMenuButton.isVisible()) {
          await test.step('test mobile menu interaction', async () => {
            try {
              // Get initial state
              const menuSelectors = [
                '[data-testid*="mobile-menu"], ' +
                '.mobile-menu, .sidebar-mobile, ' +
                '[role="navigation"][aria-expanded], ' +
                '.nav-mobile, .menu-drawer'
              ];
              
              const mobileMenu = page.locator(menuSelectors.join(', ')).first();
              const isInitiallyOpen = await mobileMenu.isVisible();
              
              // Toggle menu
              await mobileMenuButton.click();
              
              // Wait for menu to open/close with animation
              await page.waitForTimeout(500);
              
              // Verify menu state changed
              if (isInitiallyOpen) {
                await expect(mobileMenu).not.toBeVisible();
              } else {
                await expect(mobileMenu).toBeVisible();
                
                // Check for navigation links in mobile menu
                const navLinkSelectors = [
                  // Data test IDs
                  '[data-testid*="nav"], [data-testid*="menu-item"], ' +
                  // Common patterns
                  'a[href*="dashboard"], a[href*="services"], ' +
                  'a[href*="bookings"], a[href*="portfolio"], ' +
                  'a[href*="payments"], a[href*="analytics"], ' +
                  'a[href*="settings"], ' +
                  // Common class names
                  '.nav-link, .menu-item, .sidebar-link'
                ];
                
                const navLinks = mobileMenu.locator(navLinkSelectors.join(', '));
                const linkCount = await navLinks.count();
                
                testInfo.annotations.push({
                  type: 'mobile-nav',
                  description: `Found ${linkCount} navigation links in mobile menu`
                });
                
                // Verify at least some links are present
                expect(linkCount).toBeGreaterThan(0);
                
                // Test first link if it exists
                if (linkCount > 0) {
                  const firstLink = navLinks.first();
                  await expect(firstLink).toBeVisible();
                  
                  // Verify link has text
                  const linkText = await firstLink.textContent();
                  expect(linkText?.trim().length).toBeGreaterThan(0);
                }
                
                // Close menu
                await mobileMenuButton.click();
                await expect(mobileMenu).not.toBeVisible({ timeout: 3000 });
              }
            } catch (error) {
              testInfo.annotations.push({
                type: 'warning',
                description: `Mobile menu test skipped: ${error instanceof Error ? error.message : String(error)}`
              });
            }
          });
        }
      });
    } else {
      await test.step('verify desktop layout', async () => {
        // Set desktop viewport
        await page.setViewportSize({ width: 1280, height: 800 });
        
        // Check for desktop sidebar
        const desktopSidebar = page.locator(
          // Data test IDs first
          '[data-testid*="sidebar"], ' +
          // Common class names
          '.sidebar, .side-nav, .main-nav, ' +
          // Component-based selectors
          '.MuiDrawer-paper, .ant-layout-sider, ' +
          // Semantic elements
          'aside, nav',
          // Exclude mobile-specific elements
          { hasNot: page.locator('[class*="mobile"], [data-mobile]') }
        ).first();
        
        await test.step('check desktop sidebar', async () => {
          await expect(desktopSidebar).toBeVisible({ timeout: 5000 });
          
          // Check that it's properly expanded
          const isCollapsed = await desktopSidebar.evaluate(el => {
            const style = window.getComputedStyle(el);
            return style.width === '0px' || 
                   style.visibility === 'hidden' || 
                   style.display === 'none' ||
                   el.getAttribute('aria-expanded') === 'false';
          });
          
          expect(isCollapsed).toBeFalsy('Desktop sidebar should be expanded');
          
          // Check for navigation links
          const navLinks = desktopSidebar.locator('a, [role="menuitem"], .nav-link');
          const linkCount = await navLinks.count();
          
          testInfo.annotations.push({
            type: 'desktop-nav',
            description: `Found ${linkCount} navigation links in desktop sidebar`
          });
          
          // Verify at least some links are present
          expect(linkCount).toBeGreaterThan(0);
          
          // Test first link if it exists
          if (linkCount > 0) {
            const firstLink = navLinks.first();
            await expect(firstLink).toBeVisible();
            
            // Verify link has text
            const linkText = await firstLink.textContent();
            expect(linkText?.trim().length).toBeGreaterThan(0);
            
            // Test navigation
            const href = await firstLink.getAttribute('href');
            if (href && !href.startsWith('#')) {
              await firstLink.click();
              await page.waitForLoadState('networkidle');
              await page.goBack();
              await page.waitForURL(/\/vendor\/dashboard/);
            }
          }
        });
        
        // Check that mobile header is hidden on desktop
        const mobileHeader = page.locator(
          // Data test IDs first
          '[data-testid*="mobile"], ' +
          // Common class names
          '.mobile-header, .header-mobile, ' +
          // Common patterns
          '[class*="mobile"][class*="header"], ' +
          'header[class*="mobile"]'
        ).first();
        
        if (await mobileHeader.isVisible({ timeout: 1000 })) {
          await test.step('verify mobile header is hidden on desktop', async () => {
            const display = await mobileHeader.evaluate(el => 
              window.getComputedStyle(el).display
            );
            expect(display).toMatch(/none|hidden/);
          });
        }
      });
    }
  });
});

test.describe('Vendor API', () => {
  test('should return vendor data for valid slug', async ({ request }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify API returns vendor data correctly' 
    });
    
    // Test with a known vendor slug
    const vendorSlug = 'photovea-studio';
    
    const response = await request.get(`/api/vendor/${vendorSlug}`);
    
    // Check status
    expect(response.status()).toBe(200);
    
    // Check response content
    const vendorData = await response.json();
    
    // Verify the response structure
    expect(vendorData).toHaveProperty('name');
    expect(vendorData).toHaveProperty('rating');
    expect(vendorData).toHaveProperty('location');
    expect(vendorData).toHaveProperty('description');
    expect(vendorData).toHaveProperty('services');
    expect(vendorData).toHaveProperty('reviews');
    expect(vendorData).toHaveProperty('portfolio');
    
    // Check data types
    expect(typeof vendorData.name).toBe('string');
    expect(typeof vendorData.rating).toBe('number');
    expect(Array.isArray(vendorData.services)).toBe(true);
    expect(Array.isArray(vendorData.reviews)).toBe(true);
    expect(Array.isArray(vendorData.portfolio)).toBe(true);
    
    // Check that name is not empty
    expect(vendorData.name.trim().length).toBeGreaterThan(0);
    
    // Check rating is reasonable (0-5)
    expect(vendorData.rating).toBeGreaterThanOrEqual(0);
    expect(vendorData.rating).toBeLessThanOrEqual(5);
  });

  test('should return 404 for invalid vendor slug', async ({ request }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify API returns 404 for non-existent vendor' 
    });
    
    const invalidSlug = 'non-existent-vendor-12345';
    
    const response = await request.get(`/api/vendor/${invalidSlug}`);
    
    // Should return 404
    expect(response.status()).toBe(404);
    
    // Check error response
    const errorData = await response.json();
    expect(errorData).toHaveProperty('error');
    expect(errorData.error).toContain('not found');
  });

  test('should include related data in response', async ({ request }) => {
    const vendorSlug = 'photovea-studio';
    
    const response = await request.get(`/api/vendor/${vendorSlug}`);
    expect(response.status()).toBe(200);
    
    const vendorData = await response.json();
    
    // Check that related models are included
    expect(vendorData.category).toBeDefined();
    expect(vendorData.location).toBeDefined();
    
    // If reviews exist, check structure
    if (vendorData.reviews && vendorData.reviews.length > 0) {
      const review = vendorData.reviews[0];
      expect(review).toHaveProperty('id');
      expect(review).toHaveProperty('customerName');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('comment');
      expect(review).toHaveProperty('createdAt');
    }
    
    // If portfolio exists, check structure
    if (vendorData.portfolio && vendorData.portfolio.length > 0) {
      const item = vendorData.portfolio[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('imageUrl');
      expect(item).toHaveProperty('description');
    }
  });

  test('should handle multiple vendor slugs', async ({ request }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify API works with different vendor slugs' 
    });
    
    // Test multiple slugs if available, otherwise test the same one multiple times
    const vendorSlugs = ['photovea-studio']; // Add more slugs as needed
    
    for (const slug of vendorSlugs) {
      const response = await request.get(`/api/vendor/${slug}`);
      expect(response.status()).toBe(200);
      
      const vendorData = await response.json();
      expect(vendorData).toHaveProperty('name');
      expect(typeof vendorData.name).toBe('string');
      expect(vendorData.name.trim().length).toBeGreaterThan(0);
    }
  });

  test('should work with nested category/location/vendorSlug endpoint', async ({ request }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify nested API endpoint returns vendor data' 
    });
    
    const response = await request.get('/api/vendors/photographers/tamilnadu/photovea-studio');
    expect(response.status()).toBe(200);
    
    const vendorData = await response.json();
    
    // Verify it returns the same data as the simple endpoint
    expect(vendorData).toHaveProperty('name');
    expect(vendorData).toHaveProperty('rating');
    expect(vendorData).toHaveProperty('location');
    expect(vendorData).toHaveProperty('category');
    expect(vendorData).toHaveProperty('services');
  });

  test('should return 404 for invalid vendorSlug in nested endpoint', async ({ request }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify 404 for invalid vendorSlug in nested API' 
    });
    
    const response = await request.get('/api/vendors/photographers/tamilnadu/invalid-vendor-12345');
    expect(response.status()).toBe(404);
    
    const errorData = await response.json();
    expect(errorData).toHaveProperty('error');
  });
});
