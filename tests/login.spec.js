// Импортируем 'test' и 'expect' из библиотеки Playwright
const { test, expect } = require('@playwright/test');

// Описываем наш набор тестов
test.describe('Авторизация на Sauce Demo', () => {
// Создаем тест-кейс
  test('Пользователь должен успешно войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    // Используем селектор по id
    await page.locator('#user-name').fill('standard_user');

    // 3. Вводим пароль
    // Используем селектор по placeholder
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    // Используем селектор по data-test атрибуту
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем, что URL изменился и содержит нужную часть
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});


//Описание набора тестов 2 (по доп.заданию)
test.describe('Неуспешный вход с заблокированным пользователем', () => {
// Создаем тест-кейс
  test("Сценарий неуспешного входа", async ({ page }) => {
  //1.	Перейдите на страницу https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

  // 2.	Введите логин locked_out_user и пароль secret_sauce.
    await page.locator("#user-name").fill('locked_out_user');
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

  //3.	Нажмите на кнопку "Login".
    await page.locator('[data-test="login-button"]').click();
    
  //4.	Добавьте проверку: убедитесь, что на странице появилось сообщение об ошибке с текстом Epic sadface: Sorry, this user has been locked out..
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');


  });
});







