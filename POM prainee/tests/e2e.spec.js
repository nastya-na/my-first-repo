import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";




test('Успешный логин и проверка страницы товаров', async ({ page }) => {
    // 1. Инициируем наши Page Objects, передавая им объект 'page'
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);


    // 2. Используем методы Page Objects для взаимодействия со страницей
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // 3.  Используем методы Page Objects для проверок на новой странице
    // Проверяем, что заголовок на странице инвенторя верный
    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');

    // Также можно проверить URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


    // п.4 Добавить в корзину самый дорогой товар на странице. Подсказка: отсортируйте товар от самого дорого к дешевому и выберите первый товар.
    await inventoryPage.sortHilo();

    // для п.6.	- фиксирую под константу самый дорогой товар после сортировки
    const mostExpItem = await inventoryPage.getItemName();


    await inventoryPage.addItemToCart();


    // 5.	Перейти в корзину.
    await inventoryPage.openCart();

    // п.6.	Проверить, что в корзине находится именно тот товар, который вы добавили.
    const addItemCart = await cartPage.getFirstItemCart()

    await expect(mostExpItem).toBe(addItemCart);

    //  7.	Начать оформление заказа (нажать "Checkout").
    await cartPage.goToCheckout();

    // 8.	Заполнить информацию о пользователе (используйте любые данные, например: Имя - "Test", Фамилия - "User", Индекс - "12345").
    // 9.	Продолжить оформление заказа (нажать "Continue").
    await checkoutStepOne.fillUserInfo("Test", "User", "12345");


    // 10.	Завершить покупку (нажать "Finish").
    await checkoutStepTwo.finishCheckout();

    // 11.	Убедиться, что заказ успешно оформлен (проверить наличие текста "Thank you for your order!").
    const textComlete = await checkoutComplete.getCompletionMessage();
    await expect(textComlete).toBe("Thank you for your order!");

});
