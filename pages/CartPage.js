export class CartPage {
constructor(page) {
    this.page = page;

    this.itemNameCart = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    
}

async goToCheckout() {
    await this.checkoutButton.click();
}

async getFirstItemCart() {
    return await this.itemNameCart.first().textContent();
}
}




