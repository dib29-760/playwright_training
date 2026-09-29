import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

type Fixture = {
    loggedInPage: Page
};

export const test = base.extend<Fixture>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('customer3@practicesoftwaretesting.com', 'pass123');
    await use(page); 
  },
});

export { expect };