export class BasePage {
  constructor(page) {
    this.page = page;
  }
  async navigateTo() {
    await this.page.goto('/');
  }

  async waitForURL(cateUrl) {
    await this.page.waitForURL(cateUrl);
  }
}
