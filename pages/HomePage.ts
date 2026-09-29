import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
    private readonly cartLink: Locator;
    private readonly sortDropdown: Locator;
    private readonly productTitles: Locator;
    private readonly prices: Locator;
    private readonly searchTextbox: Locator;
    private readonly searchButton: Locator;
    private readonly cartQuantity: Locator;
    private readonly alertAdded: Locator;
    private readonly alertDeleted: Locator;
    private readonly addToCartButton: Locator;
    private readonly homeTab: Locator;

    constructor(protected page: Page) {
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort' });
        this.cartLink = page.getByRole('link', { name: 'cart'});
        this.productTitles = page.getByRole('heading', { level: 5 });
        this.prices = page.locator('[data-test="product-price"]');
        this.searchTextbox = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.cartQuantity = page.locator('[data-test="cart-quantity"]');
        this.alertAdded = page.getByRole('alert', { name: 'Product added to shopping cart.' });
        this.alertDeleted = page.getByRole('alert', { name: 'Product deleted.' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.homeTab = page.getByRole('link', { name: 'Home' });
    }

    async goto() {
        // await this.page.goto('https://practicesoftwaretesting.com');
        await this.homeTab.click();
        await expect(this.page.getByRole('heading', { name : 'Sort' })).toBeVisible();
    }

    async addItemToCart(item: string) {
        await this.filterByItem(item);
        await this.productTitles.getByText(item, { exact: true }).click();
        await this.addToCartButton.click();
        await expect(this.alertAdded).toBeVisible();
    }

    async removeItemFromCart(item: string) {
        await this.cartLink.click();
        const productRow = this.page.locator('tr').filter({ has: this.page.getByText(item, { exact: true }) });

        await expect(productRow).toHaveCount(1);

        await productRow.locator('a.btn.btn-danger').click();
        await expect(this.alertDeleted).toBeVisible();
    }

    async filterByItem(item: string) {
        await this.searchTextbox.fill(item);
        await this.searchButton.click();
    }

    async itemsInCart(quantity: string) {
        await expect(this.cartQuantity).toHaveText(quantity)
    }
}