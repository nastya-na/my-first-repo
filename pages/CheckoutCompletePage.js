export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.headerSuccess = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.headerSuccess.textContent();
    }

}

