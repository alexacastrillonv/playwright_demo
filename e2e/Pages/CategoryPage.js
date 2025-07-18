import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.categoryTitle = page.locator('.content-title > .h4');
    this.productList = page.locator(
      'div[data-list~="product-list"] > div.product-grid'
    );
  }

  async getCategoryTitle() {
    return this.categoryTitle.textContent();
  }
  async getProductListLength() {
    return this.productList.count();
  }
}
