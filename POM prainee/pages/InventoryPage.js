// Страница со списком товаров (главная после логина).
// Элементы: заголовок страницы, иконка корзины, список товаров, кнопки "Add to cart" для каждого товара.

export class InventoryPage {
constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.addToCartButtons = page.locator('[id^="add-to-cart"]');
    this.sortList = page.locator('.product_sort_container');  // через класс
    
}

// добавление позиции в корзину, прописала добавление первой, т.к. далее в задании есть необходимость сортировки и тогда не корректно искать по имени товара
async addItemToCart() {
    await this.addToCartButtons.first().click();
}

// сравнение самого дорогого товара и тем, что дабвлено в корзину
async getItemName() {
    return await this.itemName.first().textContent();
}


// добавила еще один метод, для выполнения теста, п.4 Сценария для автоматизации
async sortHilo() {
    await this.sortList.selectOption('hilo'); 
}

// открыть корзину
async openCart() {
    await this.cartLink.click();
}

// "обрабатываем" элемент, забираем оттуда текст
async getPageTitle() {
    return await this.pageTitle.textContent();
}
}




