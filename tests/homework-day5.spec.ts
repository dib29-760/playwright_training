import { test, expect } from '../fixtures';
import { HomePage } from '../pages/HomePage';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { LoginPage } from '../pages/LoginPage';

test('Fixture test', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/account/);
});

test.describe('catalog hooks', () => {
    test.beforeAll(async () => {
        console.log('Test suite started:', new Date().toLocaleTimeString());
    });

    test.beforeEach(async ({ loggedInPage }) => {
        await expect(loggedInPage).toHaveURL(/account/);
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            await testInfo.attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        }
    });

    test.afterAll(async () => {
        console.log("Test suite finished:", new Date().toLocaleTimeString());
    });

    test('Hooks test', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await expect(page.getByRole('img', { name: 'Banner' })).toBeVisible();
    });
});


type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: string;
};

const csvPath = path.join(process.cwd(), 'test-data', 'login-cases.csv');

const csvText = fs.readFileSync(csvPath, 'utf8');

const loginCases = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
}) as LoginCase[];

for (const data of loginCases) {
  test(`CSV data: ${data.name} can log in`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(data.email, data.password);
    if (data.expectedResult === 'success') {
        await expect(page).toHaveURL(/account/);
    } else {
        await expect(page.locator('[data-test="login-error"]')).toBeVisible();
        await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    }
  });
}