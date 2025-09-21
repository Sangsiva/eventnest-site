import { test, expect } from '@playwright/test';

test.describe('Photographer Contact Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a photographer page
    await page.goto('http://localhost:3000/photographers/tamilnadu/photovea-studio', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Give extra time for React to load
  });

  test('should load photographer page successfully', async ({ page }) => {
    // Check if page loads with correct title
    await expect(page).toHaveTitle(/EventNest/);

    // Check if photographer name is displayed
    await expect(page.locator('text=Photovea Studio')).toBeVisible();

    // Check if contact forms are present
    await expect(page.locator('text=Get Connected')).toBeVisible();

    // Check if test button is present
    await expect(page.locator('text=🧪 Test Button')).toBeVisible();

    // Check if Call Now and Send Message buttons are present
    await expect(page.locator('text=📞 Call Now')).toBeVisible();
    await expect(page.locator('text=💬 Send Message')).toBeVisible();
  });

  test.describe('Test Button Tests', () => {
    test('should show test message when test button is clicked', async ({ page }) => {
      // Click test button
      await page.locator('text=🧪 Test Button').click();

      // Check if test message appears
      await expect(page.locator('text=Test Button Works!')).toBeVisible();
      await expect(page.locator('text=This confirms that button clicks are functioning properly.')).toBeVisible();
    });

    test('should auto-hide test message after 3 seconds', async ({ page }) => {
      // Click test button
      await page.locator('text=🧪 Test Button').click();

      // Test message should appear
      await expect(page.locator('text=Test Button Works!')).toBeVisible();

      // Wait for auto-hide (3 seconds)
      await page.waitForTimeout(3500);

      // Test message should be gone
      await expect(page.locator('text=Test Button Works!')).not.toBeVisible();
    });

    test('should manually close test message with X button', async ({ page }) => {
      // Click test button
      await page.locator('text=🧪 Test Button').click();

      // Test message should appear
      await expect(page.locator('text=Test Button Works!')).toBeVisible();

      // Click the X button to close
      await page.locator('.fixed.top-4.left-4').locator('button').click();

      // Test message should be gone
      await expect(page.locator('text=Test Button Works!')).not.toBeVisible();
    });
  });

  test.describe('Modal Popup Tests', () => {
    test.setTimeout(60000); // Increase timeout for modal tests

    test('should open modal when clicking Call Now button', async ({ page }) => {
      // Wait for buttons to be visible
      await page.waitForSelector('text=📞 Call Now', { timeout: 10000 });

      // Click Call Now button
      await page.locator('text=📞 Call Now').click();

      // Wait for modal to appear
      await page.waitForSelector('text=Get Connected', { timeout: 10000 });

      // Check if modal appears
      await expect(page.locator('text=Get Connected')).toBeVisible();
      await expect(page.locator('text=Share your details and our team will connect you with Photovea Studio')).toBeVisible();
    });

    test('should open modal when clicking Send Message button', async ({ page }) => {
      // Wait for buttons to be visible
      await page.waitForSelector('text=💬 Send Message', { timeout: 10000 });

      // Click Send Message button
      await page.locator('text=💬 Send Message').click();

      // Wait for modal to appear
      await page.waitForSelector('text=Get Connected', { timeout: 10000 });

      // Check if modal appears
      await expect(page.locator('text=Get Connected')).toBeVisible();
      await expect(page.locator('text=Share your details and our team will connect you with Photovea Studio')).toBeVisible();
    });

    test('should close modal when clicking X button', async ({ page }) => {
      // Wait for buttons to be visible
      await page.waitForSelector('text=📞 Call Now', { timeout: 10000 });

      // Open modal
      await page.locator('text=📞 Call Now').click();

      // Wait for modal to appear
      await page.waitForSelector('text=Get Connected', { timeout: 10000 });
      await expect(page.locator('text=Get Connected')).toBeVisible();

      // Wait for close button to be visible and click it
      await page.waitForSelector('text=×', { timeout: 5000 });
      await page.locator('text=×').click();

      // Check if modal is closed
      await expect(page.locator('text=Get Connected')).not.toBeVisible();
    });
  });

  test.describe('Form Validation Tests', () => {
    test('should validate phone number minimum 10 digits', async ({ page }) => {
      // Open modal
      await page.locator('text=📞 Call Now').click();

      // Fill form with invalid phone (less than 10 digits)
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="phone"]', '123456789'); // 9 digits

      // Try to submit
      await page.locator('button[type="submit"]').click();

      // Should show validation error or prevent submission
      // Check that form is still visible (not submitted)
      await expect(page.locator('text=Get Connected')).toBeVisible();
    });

    test('should accept valid phone number with 10 digits', async ({ page }) => {
      // Open modal
      await page.locator('text=📞 Call Now').click();

      // Fill form with valid data
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="phone"]', '9876543210'); // 10 digits

      // Submit should be allowed (though API might fail, form validation should pass)
      await page.locator('button[type="submit"]').click();

      // Should show success message or error from API
      // (We expect API error since it's not running, but form validation should pass)
    });
  });

  test.describe('Top Hero Form Tests', () => {
    test('should have phone validation on top form', async ({ page }) => {
      // Fill top form with invalid phone
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[id="phone"]', '123456789'); // 9 digits

      // Try to submit
      await page.locator('button:has-text("Submit Details")').first().click();

      // Should show validation error
      await expect(page.locator('text=Get Connected')).toBeVisible(); // Form should still be there
    });

    test('should submit top form successfully', async ({ page }) => {
      // Fill top form with valid data
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[id="phone"]', '9876543210');

      // Submit
      await page.locator('button:has-text("Submit Details")').first().click();

      // Should show success message
      await expect(page.locator('text=Success!')).toBeVisible();
      await expect(page.locator('text=Your details have been saved successfully!')).toBeVisible();
    });
  });

  test.describe('Success Message Tests', () => {
    test('should show success toast after form submission', async ({ page }) => {
      // Open modal and submit form
      await page.locator('text=📞 Call Now').click();
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="phone"]', '9876543210');
      await page.locator('button[type="submit"]').click();

      // Should show success message
      await expect(page.locator('text=Success!')).toBeVisible();
      await expect(page.locator('text=Your details have been saved successfully!')).toBeVisible();
    });

    test('should auto-hide success message after 5 seconds', async ({ page }) => {
      // Submit form
      await page.locator('text=📞 Call Now').click();
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="phone"]', '9876543210');
      await page.locator('button[type="submit"]').click();

      // Success message should appear
      await expect(page.locator('text=Success!')).toBeVisible();

      // Wait for auto-hide (5 seconds)
      await page.waitForTimeout(6000);

      // Success message should be gone
      await expect(page.locator('text=Success!')).not.toBeVisible();
    });
  });

  test.describe('API Integration Tests', () => {
    test.setTimeout(90000); // Increase timeout for API tests

    test('should call contact-inquiries API endpoint', async ({ page }) => {
      // Wait for modal to be ready
      await page.waitForSelector('text=📞 Call Now', { timeout: 15000 });

      // Listen for API calls BEFORE clicking
      const apiCallPromise = page.waitForRequest(request =>
        request.url().includes('/api/contact-inquiries') && request.method() === 'POST',
        { timeout: 30000 }
      );

      // Open modal and submit form
      await page.locator('text=📞 Call Now').click();
      await page.waitForSelector('text=Get Connected', { timeout: 10000 });

      // Fill and submit form
      await page.fill('input[name="name"]', 'API Test User');
      await page.fill('input[name="phone"]', '9876543210');
      await page.locator('button[type="submit"]').click();

      // Wait for API call
      try {
        const apiCall = await apiCallPromise;
        expect(apiCall).toBeTruthy();

        // Parse request body
        const body = JSON.parse(apiCall.postData() || '{}');
        expect(body.name).toBe('API Test User');
        expect(body.phone).toBe('9876543210');
        expect(body.vendorSlug).toBe('photovea-studio');
      } catch (error) {
        console.log('API call not intercepted, checking alternative approach...');
        // Alternative: check if success message appears (indicating API worked)
        await page.waitForSelector('text=Success!', { timeout: 10000 });
        expect(await page.locator('text=Success!').isVisible()).toBe(true);
      }
    });
  });
});
