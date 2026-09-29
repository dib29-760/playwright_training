import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test('Adding item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.addItemToCart('Combination Pliers');
    await homePage.goto();
    await homePage.addItemToCart('Bolt Cutters');
    await homePage.itemsInCart('2');
});

test('Removing item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.addItemToCart('Combination Pliers');
    await homePage.goto();
    await homePage.addItemToCart('Pliers');
    await homePage.itemsInCart('2');

    await homePage.removeItemFromCart('Pliers');
    await homePage.itemsInCart('1');
});