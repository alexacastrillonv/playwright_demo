class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryTitle = page.locator('.content-title > .h4');
    this.productList = page.locator(
      'div[data-list~="product-list"] > div.product-grid'
    );
  }

  async waitForURL(cateUrl) {
    await this.page.waitForURL(cateUrl);
  }

  async getCategoryTitle() {
    return await this.categoryTitle.textContent();
  }
  async getProductListLength() {
    return await this.productList.count();
  }
}
module.exports = { CategoryPage };
