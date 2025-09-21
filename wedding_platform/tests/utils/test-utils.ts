import { Page, expect, Locator } from '@playwright/test';

export class TestUtils {
  constructor(public page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageTitle(title: string) {
    await expect(this.page).toHaveTitle(new RegExp(title, 'i'));
  }

  async verifyElementVisible(selector: string | Locator) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await expect(element).toBeVisible({ timeout: 5000 });
  }

  async verifyElementText(selector: string | Locator, text: string) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await expect(element).toContainText(text, { timeout: 5000 });
  }

  async clickElement(selector: string | Locator) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.click({ timeout: 5000 });
  }

  async fillFormField(selector: string | Locator, value: string) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.fill(value, { timeout: 5000 });
  }

  async waitForNavigation() {
    await this.page.waitForURL('**/*', { waitUntil: 'networkidle' });
  }

  async waitForElement(selector: string, options: { state?: 'visible' | 'hidden' | 'attached' | 'detached', timeout?: number } = {}) {
    const defaultOptions = { state: 'visible' as const, timeout: 5000 };
    const finalOptions = { ...defaultOptions, ...options };
    const element = this.page.locator(selector);
    await element.waitFor(finalOptions);
    return element;
  }

  async getByTestId(testId: string) {
    return this.page.locator(`[data-testid="${testId}"]`);
  }
}
