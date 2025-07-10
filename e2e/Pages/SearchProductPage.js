class SearchProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1[class="h4"]');
    this.searchInput = page.getByPlaceholder('Search For Products').first();
    this.productNotFoundMessage = page.locator('.content-products > p');
    this.productList = page.locator(
      'div[data-list~="product-list"] > div.product-grid'
    );
    this.breadcrumb = page
      .locator('.breadcrumb-item')
      .filter({ hasText: 'Search' });
  }

  async getTitleText() {
    return await this.title.textContent();
  }

  async getSearchInputValue() {
    return await this.searchInput.inputValue();
  }

  async getProductNotFoundMessage() {
    return await this.productNotFoundMessage.textContent();
  }

  async getProductListLength() {
    return await this.productList.count();
  }
  async waitForURL(productUrl) {
    await this.page.waitForURL(productUrl);
  }

  async getRandomProduct() {
    const products = await this.page.$$('.product-layout.product-grid');
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    const nameData = await randomProduct.$('.caption .title');
    const name = await nameData?.innerText();
    const priceData = await randomProduct.$('.caption .price');
    const price = await priceData?.innerText();
    const imageData = await randomProduct.$('.image img');
    const imageUrl = await imageData?.getAttribute('src');
    const selectedProduct = {
      name: name?.trim(),
      price: price?.trim(),
      image: imageUrl,
    };
    await randomProduct.click();
    return selectedProduct;
  }
}
module.exports = { SearchProductPage };
