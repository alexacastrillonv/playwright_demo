import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homePageTitle = page.getByTitle('Poco Electro');
    this.cartBadge = page.locator('.cart-item-total').first();
    this.dummyMessage = page.locator('p[class="m-0 font-size-sm"] strong');
    this.mainNavigation = page.locator('#main-navigation');
    this.searchInput = page.getByPlaceholder('Search For Products').first();
    this.moduleTitle = page.locator('.module-title');
    this.megaMenu = page.locator('span.title', { hasText: 'Mega Menu' });
    this.megaMenuSubmenuContent = page.locator('.mega-menu-content');
    this.megaMenuSubmenu = searchCategory =>
      page.locator(`a[title="${searchCategory}"]`);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.homeMenuOption = page.locator('.title').filter({ hasText: 'Home' });
    this.copyrightInfo = page
      .locator('.footer')
      .filter({ hasText: '© LambdaTest - Powered by OpenCart' });
  }

  async clickHomeMenuOption() {
    await this.homeMenuOption.click();
  }
  async getCartBadgeValue() {
    const badgeText = await this.cartBadge.textContent();
    return parseInt(badgeText?.trim() || '0', 10);
  }

  async getDummyMessage() {
    return this.dummyMessage.textContent();
  }

  async getModuleTitles() {
    const titles = await this.moduleTitle.allTextContents();
    return titles.map(title => title.trim());
  }

  async hoverMegaMenu() {
    await this.megaMenu.hover();
  }

  async selectMegaMenuSubmenu(searchCategory) {
    await this.megaMenuSubmenu(searchCategory).click();
  }

  async searchProduct(searchTerm) {
    await this.searchInput.fill(searchTerm);
  }
  async clickSearchButton() {
    await this.searchButton.click();
  }
}
