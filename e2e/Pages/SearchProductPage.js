import { BasePage } from './BasePage';
export class SearchProductPage extends BasePage {
  constructor(page) {
    super(page);
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
    return this.title.textContent();
  }

  async getSearchInputValue() {
    return this.searchInput.inputValue();
  }

  async getProductNotFoundMessage() {
    return this.productNotFoundMessage.textContent();
  }

  async getProductListLength() {
    return this.productList.count();
  }

  async getProductElements() {
    return this.page.$$('.product-layout.product-grid');
  }

  async extractProductData(productElement) {
    const nameData = await productElement.$('.caption .title');
    const name = await nameData?.innerText();
    const priceData = await productElement.$('.caption .price');
    const price = await priceData?.innerText();
    const imageData = await productElement.$('.image img');
    const imageUrl = await imageData?.getAttribute('src');
    return {
      name: name?.trim(),
      price: price?.trim(),
      image: imageUrl,
    };
  }

  async clickProduct(productElement) {
    await productElement.click();
  }

  async getRandomProduct() {
    const products = await this.getProductElements();
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    const selectedProduct = await this.extractProductData(randomProduct);
    await this.clickProduct(randomProduct);
    return selectedProduct;
  }
}
