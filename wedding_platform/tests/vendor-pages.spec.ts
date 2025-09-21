import { test, expect } from '@playwright/test';

test.describe('Wedding Platform - Vendor Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Set shorter timeout and ensure the dev server is running
    page.setDefaultTimeout(5000);
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Homepage loads with vendor categories', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/EventNest/);

    // Check main heading
    await expect(page.locator('h1').first()).toContainText('Wedding and Event Planning Platform');

    // Check vendor categories are displayed
    await expect(page.locator('text=Photographers')).toBeVisible();
    await expect(page.locator('text=Makeup Artists')).toBeVisible();
    await expect(page.locator('text=Venues')).toBeVisible();
  });

  test('Photographers page loads and displays vendors', async ({ page }) => {
    await page.goto('http://localhost:3000/photographers/tamilnadu');
    await page.waitForLoadState('networkidle');

    // Check page loads without errors
    await expect(page.locator('h2').filter({ hasText: 'Featured Wedding Photographers' })).toBeVisible();

    // Check that photographers are displayed
    await expect(page.locator('text=Photovea Studio')).toBeVisible();
    await expect(page.locator('text=Moments Story')).toBeVisible();
    await expect(page.locator('text=Cine Pixs Studiios')).toBeVisible();
    await expect(page.locator('text=Memory Scapes Photography')).toBeVisible();

    // Check that we have 4 photographers
    const photographerCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(photographerCards).toHaveCount(4);

    // Check ratings are displayed
    await expect(page.locator('text=⭐')).toHaveCount(4);
  });

  test('Makeup Artists page loads and displays vendors', async ({ page }) => {
    await page.goto('http://localhost:3000/makeup-artists/tamilnadu');
    await page.waitForLoadState('networkidle');

    // Check page loads without errors
    await expect(page.locator('h2').filter({ hasText: 'Featured Makeup Artists' })).toBeVisible();

    // Check that makeup artists are displayed
    await expect(page.locator('text=Glamour Beauty Studio')).toBeVisible();
    await expect(page.locator('text=Beauty Boulevard')).toBeVisible();
    await expect(page.locator('text=Diva Makeup Lounge')).toBeVisible();
    await expect(page.locator('text=Glamour Queen Makeup')).toBeVisible();

    // Check that we have 4 makeup artists
    const makeupArtistCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(makeupArtistCards).toHaveCount(4);

    // Check ratings are displayed
    await expect(page.locator('text=⭐')).toHaveCount(4);
  });

  test('Photographer profile page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/photographers/tamilnadu/photovea-studio');
    await page.waitForLoadState('networkidle');

    // Check page loads without errors
    await expect(page.locator('h1').filter({ hasText: 'Photovea Studio' })).toBeVisible();

    // Check vendor details are displayed
    await expect(page.locator('text=Professional wedding photography studio')).toBeVisible();
    await expect(page.locator('text=⭐ 4.8')).toBeVisible();
  });

  test('Makeup Artist profile page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/makeup-artists/tamilnadu/glamour-beauty-studio');
    await page.waitForLoadState('networkidle');

    // Check page loads without errors
    await expect(page.locator('h1').filter({ hasText: 'Glamour Beauty Studio' })).toBeVisible();

    // Check vendor details are displayed
    await expect(page.locator('text=Professional bridal makeup artists')).toBeVisible();
    await expect(page.locator('text=⭐ 4.8')).toBeVisible();
  });

  test('API endpoints return vendor data', async ({ request }) => {
    // Test photographers API
    const photographersResponse = await request.get('http://localhost:3000/api/vendors/category/photographers/location/tamilnadu');
    expect(photographersResponse.ok()).toBeTruthy();

    const photographersData = await photographersResponse.json();
    expect(Array.isArray(photographersData)).toBeTruthy();
    expect(photographersData).toHaveLength(4);

    // Verify photographer data structure
    const firstPhotographer = photographersData[0];
    expect(firstPhotographer).toHaveProperty('name');
    expect(firstPhotographer).toHaveProperty('rating');
    expect(firstPhotographer).toHaveProperty('reviewCount');
    expect(firstPhotographer).toHaveProperty('location.city');
    expect(firstPhotographer).toHaveProperty('services');

    // Test makeup artists API
    const makeupArtistsResponse = await request.get('http://localhost:3000/api/vendors/category/makeup-artists/location/tamilnadu');
    expect(makeupArtistsResponse.ok()).toBeTruthy();

    const makeupArtistsData = await makeupArtistsResponse.json();
    expect(Array.isArray(makeupArtistsData)).toBeTruthy();
    expect(makeupArtistsData).toHaveLength(4);

    // Verify makeup artist data structure
    const firstMakeupArtist = makeupArtistsData[0];
    expect(firstMakeupArtist).toHaveProperty('name');
    expect(firstMakeupArtist).toHaveProperty('rating');
    expect(firstMakeupArtist).toHaveProperty('reviewCount');
    expect(firstMakeupArtist).toHaveProperty('location.city');
    expect(firstMakeupArtist).toHaveProperty('services');
  });

  test('Navigation between pages works correctly', async ({ page }) => {
    // Start at homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Click on Photographers category
    await page.locator('text=Photographers').first().click();
    await expect(page).toHaveURL('http://localhost:3000/photographers/tamilnadu');
    await expect(page.locator('h2').filter({ hasText: 'Featured Wedding Photographers' })).toBeVisible();

    // Go back to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Click on Makeup Artists category
    await page.locator('text=Makeup Artists').first().click();
    await expect(page).toHaveURL('http://localhost:3000/makeup-artists/tamilnadu');
    await expect(page.locator('h2').filter({ hasText: 'Featured Makeup Artists' })).toBeVisible();

    // Click on a specific makeup artist
    await page.locator('text=Glamour Beauty Studio').first().click();
    await expect(page).toHaveURL('http://localhost:3000/makeup-artists/tamilnadu/glamour-beauty-studio');
    await expect(page.locator('text=Glamour Beauty Studio')).toBeVisible();
  });

  test('Error handling works properly', async ({ page }) => {
    // Test with invalid photographer slug
    await page.goto('http://localhost:3000/photographers/tamilnadu/non-existent-photographer');
    await page.waitForLoadState('networkidle');

    // Should show error page
    await expect(page.locator('text=Something went wrong!')).toBeVisible();
    await expect(page.locator('text=Try Again')).toBeVisible();
  });
});
