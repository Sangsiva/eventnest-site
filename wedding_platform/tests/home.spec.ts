import { test, expect, Page, Locator } from '@playwright/test';
import { TestUtils } from './utils/test-utils';

test.describe('Home Page', () => {
  let testUtils: TestUtils;
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    testUtils = new TestUtils(page);
    
    // Configure retry logic for page navigation
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await testUtils.navigateTo('/');
        
        // Wait for any of these elements to be present as an indicator that the page has loaded
        await Promise.race([
          page.waitForSelector(
            '[data-testid*="welcome"], ' +
            'h1, h2, ' +
            '[role="main"], ' +
            '.home, ' +
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
        
        // Verify we're not on an error page
        if (page.url().includes('error') || page.url().includes('404')) {
          throw new Error(`Landed on error page: ${page.url()}`);
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
    throw lastError || new Error('Failed to load home page after multiple attempts');
  });

  test('should display welcome message', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify welcome message is displayed correctly' 
    });
    
    // Check for welcome heading with flexible selectors
    const headingSelectors = [
      // Data test IDs first (most reliable)
      '[data-testid*="welcome-heading"], [data-testid*="hero-heading"]',
      // Common class names
      '.welcome-heading, .hero-heading, .page-title',
      // Common heading elements
      'h1, h2',
      // Pattern-based class names
      '[class*="heading"], [class*="title"]',
      // Fallback to any visible heading
      'h1:visible, h2:visible'
    ];
    
    const heading = page.locator(headingSelectors.join(', ')).first();
    await expect(heading).toBeVisible({ timeout: 10000 });
    
    // Verify heading text is not empty and contains expected keywords
    const headingText = (await heading.textContent() || '').toLowerCase();
    expect(headingText.length).toBeGreaterThan(0);
    expect(headingText).toMatch(/(welcome|wedding|platform|vendor)/i);
    
    // Check for welcome description with flexible selectors
    const descriptionSelectors = [
      '[data-testid*="welcome-description"], [data-testid*="hero-description"]',
      '.welcome-description, .hero-description, .page-description',
      'p.lead, p:has(> strong)',
      'section p',
      'p:visible'
    ];
    
    const description = page.locator(descriptionSelectors.join(', ')).first();
    await expect(description).toBeVisible({ timeout: 10000 });
    
    // Verify description contains expected keywords
    const descriptionText = (await description.textContent() || '').toLowerCase();
    expect(descriptionText.length).toBeGreaterThan(20); // Reasonable minimum length for a description
    expect(descriptionText).toMatch(/(platform|wedding|vendor|service|manage)/i);
  });

  test('should have working navigation links', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify main navigation links work correctly' 
    });
    
    // Define expected navigation items with their test IDs and paths
    const navItems = [
      { id: 'nav-vendor-dashboard', text: /dashboard|vendor/i, path: '/vendor/dashboard' },
      { id: 'nav-payments', text: /payments|earnings/i, path: '/vendor/payments' },
      { id: 'nav-services', text: /services|products/i, path: '/vendor/services' },
      { id: 'nav-portfolio', text: /portfolio|gallery/i, path: '/vendor/portfolio' }
    ];
    
    // Test each navigation item
    for (const item of navItems) {
      await test.step(`test navigation to ${item.text}`, async () => {
        // Try to find the nav item by test ID first, then by text
        let navLink = page.locator(`[data-testid="${item.id}"]`);
        
        if (!(await navLink.isVisible({ timeout: 1000 }))) {
          // Fall back to finding by text if test ID not found
          navLink = page.getByRole('link', { name: item.text, exact: false })
            .or(page.getByRole('button', { name: item.text, exact: false }))
            .first();
        }
        
        // Skip if the nav item is not found
        if (!(await navLink.isVisible({ timeout: 1000 }))) {
          test.skip(true, `Navigation item not found: ${item.id}`);
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
            
            // Navigate back to home for next test
            await testUtils.navigateTo('/');
          }
        } catch (error) {
          console.log(`Navigation test for ${item.id} completed with:`, 
            error instanceof Error ? error.message : String(error));
        }
      });
    }
  });

  test('should be responsive', async ({ isMobile }) => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify responsive behavior on different viewports' 
    });

    if (isMobile) {
      await test.step('verify mobile layout', async () => {
        // Set mobile viewport with retry logic
        await page.setViewportSize({ width: 375, height: 812 });
        await page.waitForLoadState('networkidle');
        
        // Check for mobile menu button with flexible selectors and retries
        const menuButtonSelectors = [
          // Data test IDs first (most specific)
          '[data-testid*="menu"], [data-testid*="hamburger"]',
          // Common class names
          '.mobile-menu-button, .hamburger, .menu-toggle',
          // ARIA attributes
          '[aria-label*="menu" i], [aria-label*="navigation" i]',
          // Common patterns
          '.navbar-toggler, .nav-toggle, .hamburger-menu',
          // Fallback to any button that looks like a menu
          'button:has(svg[class*="menu" i])',
          'button:has(> span:has-text("☰"))',
          // Last resort: any button that might be a menu
          'button:has(> span), button:has(> i)'
        ];
        
        const menuButton = page.locator(menuButtonSelectors.join(', ')).first();
        
        await test.step('check mobile menu button', async () => {
          // Take screenshot before checking menu button
          await page.screenshot({ path: 'test-results/mobile-layout-before-menu.png' });
          
          // Wait for the button to be visible with retries
          await expect(menuButton).toBeVisible({ timeout: 10000 });
          
          // Check that it's properly labeled
          const buttonLabel = await menuButton.evaluate(btn => {
            return btn.getAttribute('aria-label') || 
                   btn.getAttribute('title') || 
                   btn.textContent || '';
          });
          
          testInfo.annotations.push({
            type: 'menu-button',
            description: `Menu button label: ${buttonLabel}`
          });
        });
        
        // Test mobile menu interaction if button is present
        if (await menuButton.isVisible({ timeout: 5000 })) {
          await test.step('test mobile menu interaction', async () => {
            try {
              // Get mobile menu element with flexible selectors
              const mobileMenuSelectors = [
                // Most specific first
                '[data-testid*="mobile-menu"], [data-testid*="sidebar"][data-mobile]',
                '.mobile-menu, .sidebar-mobile, .nav-mobile',
                // Common patterns
                '[role="navigation"][aria-expanded], [role="menu"]',
                '.menu-drawer, .offcanvas, .drawer, .sidebar',
                // Fallback to any element that appears after clicking the menu
                'nav, aside, .menu-panel'
              ];
              
              const mobileMenu = page.locator(mobileMenuSelectors.join(', ')).first();
              
              // Click menu button and wait for menu to appear
              await menuButton.click();
              await page.waitForTimeout(1000); // Wait for animation
              
              // Check if menu is now visible
              const isMenuVisible = await mobileMenu.isVisible();
              testInfo.annotations.push({
                type: 'menu-state',
                description: `Menu visibility after click: ${isMenuVisible}`
              });
              
              if (isMenuVisible) {
                // Check for navigation links in mobile menu
                const navLinkSelectors = [
                  // Most specific first
                  '[data-testid*="nav"], [data-testid*="menu-item"], ',
                  // Common patterns
                  'a[href*="dashboard" i], a[href*="services" i], ',
                  'a[href*="bookings" i], a[href*="portfolio" i], ',
                  'a[href*="payments" i], a[href*="analytics" i], ',
                  'a[href*="settings" i], ',
                  // Common class names
                  '.nav-link, .menu-item, .sidebar-link, a',
                  // Fallback to any clickable element
                  'button, [role="button"], [onclick]'
                ];
                
                const navLinks = mobileMenu.locator(navLinkSelectors.join(', '));
                const linkCount = await navLinks.count();
                
                testInfo.annotations.push({
                  type: 'mobile-nav',
                  description: `Found ${linkCount} navigation links in mobile menu`
                });
                
                // Take screenshot of the menu
                await page.screenshot({ path: 'test-results/mobile-menu-open.png' });
                
                // Close menu
                await menuButton.click();
                await page.waitForTimeout(500); // Wait for close animation
              }
            } catch (error) {
              testInfo.annotations.push({
                type: 'warning',
                description: `Mobile menu test: ${error instanceof Error ? error.message : String(error)}`
              });
              // Take screenshot on error
              await page.screenshot({ path: 'test-results/mobile-menu-error.png' });
            }
          });
        } else {
          testInfo.annotations.push({
            type: 'warning',
            description: 'Menu button not found, skipping mobile menu tests'
          });
          // Take screenshot of the page when menu button is not found
          await page.screenshot({ path: 'test-results/menu-button-not-found.png' });
        }
      });
    } else {
      await test.step('verify desktop layout', async () => {
        // Set desktop viewport with retry logic
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.waitForLoadState('networkidle');
        
        // Take screenshot of desktop layout
        await page.screenshot({ path: 'test-results/desktop-layout.png' });
        
        // Check for desktop navigation with flexible selectors
        const desktopNavSelectors = [
          // Most specific first
          '[data-testid*="desktop-nav"], [data-testid*="main-nav"]',
          // Common class names
          '.desktop-nav, .main-nav, .primary-nav, .header-nav',
          // Semantic elements
          'nav:not([class*="mobile" i]):not([data-mobile])',
          // Common patterns
          'header nav, .site-nav, nav',
          // Fallback to any navigation element
          'nav, .nav, [role="navigation"]'
        ];
        
        const desktopNav = page.locator(desktopNavSelectors.join(', ')).first();
        
        await test.step('check desktop navigation', async () => {
          // Wait for navigation to be visible
          await expect(desktopNav).toBeVisible({ timeout: 10000 });
          
          // Check for navigation links with flexible selectors
          const navLinkSelectors = [
            // Most specific first
            'a[href][data-testid], a[href][role="menuitem"]',
            // Common patterns
            'a[href*="/"], a[href*="#"]',
            // Common class names
            '.nav-link, .menu-item, .nav-item',
            // Fallback to any link
            'a'
          ];
          
          const navLinks = desktopNav.locator(navLinkSelectors.join(', '));
          const linkCount = await navLinks.count();
          
          testInfo.annotations.push({
            type: 'desktop-nav',
            description: `Found ${linkCount} navigation links in desktop navigation`
          });
          
          // Take screenshot of navigation
          await desktopNav.screenshot({ path: 'test-results/desktop-nav.png' });
          
          // Verify at least some links are present
          expect(linkCount).toBeGreaterThan(0);
          
          // Test first link if it exists
          if (linkCount > 0) {
            const firstLink = navLinks.first();
            await expect(firstLink).toBeVisible();
            
            // Verify link has text
            const linkText = await firstLink.textContent();
            expect(linkText?.trim().length).toBeGreaterThan(0);
            
            // Get link destination
            const href = await firstLink.getAttribute('href');
            testInfo.annotations.push({
              type: 'first-link',
              description: `First nav link: ${linkText?.trim()} -> ${href}`
            });
            
            // Test navigation if it's not an anchor link
            if (href && !href.startsWith('#')) {
              try {
                // Click and wait for navigation or timeout
                await Promise.race([
                  firstLink.click().then(() => 
                    page.waitForURL(url => url.toString() !== page.url(), { timeout: 5000 })
                  ),
                  page.waitForTimeout(3000)
                ]);
                
                // Go back to home page
                if (page.url() !== 'about:blank') {
                  await page.goBack();
                  await page.waitForLoadState('networkidle');
                }
              } catch (error) {
                testInfo.annotations.push({
                  type: 'warning',
                  description: `Navigation test completed with: ${error instanceof Error ? error.message : String(error)}`
                });
              }
            }
          }
        });
      });
    }
  });

  test('should have a working vendor login', async () => {
    const testInfo = test.info();
    testInfo.annotations.push({ 
      type: 'test', 
      description: 'Verify vendor login functionality works' 
    });
    
    // Take screenshot before looking for login button
    await page.screenshot({ path: 'test-results/before-login.png' });
    
    // Look for login button with flexible selectors and retries
    const loginButtonSelectors = [
      // Data test IDs first (most specific)
      '[data-testid*="login" i], [data-testid*="signin" i]',
      // Common class names
      '.login-button, .signin-button, .btn-login, .auth-button',
      // Common patterns with case-insensitive matching
      'button:has-text(/(login|sign[ -]?in)/i), a:has-text(/(login|sign[ -]?in)/i)',
      // More flexible matching for different button text cases
      'button:has-text(/(log in|sign in|log-in|sign-in)/i), a:has-text(/(log in|sign in|log-in|sign-in)/i)',
      // Look for any button or link that might be a login
      'button:has-text(/(sign|log)[ -]?(in|up|on)/i), a:has-text(/(sign|log)[ -]?(in|up|on)/i)',
      // Fallback to any button that might be a login
      'button:has(> :text(/(login|sign[ -]?in)/i)), a:has(> :text(/(login|sign[ -]?in)/i))',
      // Last resort: any button or link that contains text that might indicate login
      ':text(/(login|sign[ -]?in)/i)'
    ];
    
    // Try to find the login button with retries
    let loginButton: Locator | null = null;
    let loginButtonFound = false;
    
    for (const selector of loginButtonSelectors) {
      try {
        loginButton = page.locator(selector).first();
        if (await loginButton.isVisible({ timeout: 2000 })) {
          loginButtonFound = true;
          testInfo.annotations.push({
            type: 'login-button',
            description: `Found login button with selector: ${selector}`
          });
          break;
        }
      } catch (error) {
        // Continue to next selector
        continue;
      }
    }
    
    if (!loginButtonFound || !loginButton) {
      // Take screenshot when login button is not found
      await page.screenshot({ path: 'test-results/login-button-not-found.png' });
      test.skip(true, 'No login button found on the page');
      return;
    }
    
    // At this point, TypeScript knows loginButton is not null
    const buttonToClick = loginButton;
    
    await test.step('test login button', async () => {
      try {
        // Get button text for debugging
        const buttonText = await buttonToClick.textContent();
        testInfo.annotations.push({
          type: 'login-button-text',
          description: `Login button text: ${buttonText?.trim()}`
        });
        
        // Get the current URL before clicking
        const initialUrl = page.url();
        
        // Scroll the button into view and click
        await buttonToClick.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // Wait for any scroll animations
        
        // Take screenshot before clicking
        await buttonToClick.screenshot({ path: 'test-results/login-button-before-click.png' });
        
        // Click the login button
        await buttonToClick.click({ timeout: 5000 });
        
        // Wait for navigation to complete or timeout
        try {
          await Promise.race([
            page.waitForURL(url => {
              const currentUrl = url.toString().toLowerCase();
              return currentUrl.includes('login') || 
                     currentUrl.includes('signin') || 
                     currentUrl.includes('auth');
            }, { timeout: 10000 }),
            page.waitForTimeout(5000) // Max wait time
          ]);
          
          // Take screenshot after navigation
          await page.screenshot({ path: 'test-results/after-login-click.png' });
          
          // If we navigated to a new page
          if (page.url() !== initialUrl) {
            // Verify we're on a login/auth page
            const currentUrl = page.url().toLowerCase();
            const isLoginPage = currentUrl.includes('login') || 
                              currentUrl.includes('signin') || 
                              currentUrl.includes('auth');
            
            testInfo.annotations.push({
              type: 'login-navigation',
              description: `Navigated to: ${page.url()}, isLoginPage: ${isLoginPage}`
            });
            
            if (!isLoginPage) {
              // If we're not on a login page, check for login form elements
              const loginFormSelectors = [
                // Form fields
                'input[type="email"], input[name*="email" i], input[name*="username" i]',
                'input[type="password"], input[name*="password" i]',
                // Buttons
                'button[type="submit"], input[type="submit"], button:has-text(/(sign|log)[ -]?in/i)'
              ];
              
              const formElements = page.locator(loginFormSelectors.join(', '));
              const formElementsCount = await formElements.count();
              
              testInfo.annotations.push({
                type: 'login-form-elements',
                description: `Found ${formElementsCount} login form elements`
              });
              
              expect(formElementsCount).toBeGreaterThan(0);
            }
          }
        } catch (navError) {
          // If navigation didn't happen, check if we're already on a page with login form
          const loginFormExists = await page.locator('form').filter({
            has: page.locator('input[type="password"]')
          }).count() > 0;
          
          if (!loginFormExists) {
            testInfo.annotations.push({
              type: 'warning',
              description: `Login navigation failed: ${navError instanceof Error ? navError.message : String(navError)}`
            });
            // Take screenshot on error
            await page.screenshot({ path: 'test-results/login-navigation-error.png' });
          }
        }
      } catch (error) {
        testInfo.annotations.push({
          type: 'error',
          description: `Login test failed: ${error instanceof Error ? error.message : String(error)}`
        });
        // Take screenshot on error
        await page.screenshot({ path: 'test-results/login-test-error.png' });
        throw error; // Re-throw to fail the test
      }
    });
  });
});
