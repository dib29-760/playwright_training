import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(protected page: Page) {
        this.emailInput = page.getByRole('textbox', { name: 'Email address *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *'});
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        await expect(this.page.getByRole('heading', { name : 'Login' })).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.loginButton.click();
//        await expect(this.page.getByRole('heading', { name: 'My account' })).toBeVisible();
    }
}