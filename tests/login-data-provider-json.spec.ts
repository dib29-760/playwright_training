import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedHeading: string;
};

// STEP 1: Build the path to the external JSON file.
const jsonPath = path.join(process.cwd(), 'test-data', 'login.json');

// STEP 2: Read the JSON file as plain text.
const jsonText = fs.readFileSync(jsonPath, 'utf8');

// STEP 3: Parse the text into an array of JavaScript objects.
const loginCases = JSON.parse(jsonText) as LoginCase[];

// STEP 4: Use every parsed object to create a separate Playwright test.
for (const data of loginCases) {
  test(`JSON data: ${data.name} can log in`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(data.email, data.password);
    await expect(page.getByRole('heading', { name: 'My account' })).toContainText(data.expectedHeading);
  });
}

