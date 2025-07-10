export class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('.h3');
        this.productPrice = page.locator('h3.price-new');
        this.quantityInput = page.locator('input[name="quantity"]').nth(1);
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }
}