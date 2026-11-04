export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.itemInfo = page.locator('[data-test="inventory-item-name"]');
        this.amountPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        
    }

async finishCheckout() {
    await this.finishButton.click();
}


}