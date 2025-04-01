import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CartPage extends BasePage {

    private pageTitleElement: Locator;
    private shoppingCartItem: Locator;
    private checkoutButton: Locator;
    private continueShoppingButton: Locator;

    constructor(protected page: Page){
        super(page);
        this.pageTitleElement = page.locator('[class="title"]');
        this.shoppingCartItem = page.locator('[class="cart_item"]');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    public async validateTitle(title: string){
        await this.validateElementText(this.pageTitleElement, title);
    }

    public async validateNumberOfCartItems(expectedNumberOfItems){
        this.validateNumberOfItems(this.shoppingCartItem, expectedNumberOfItems);
    }

    public async removeCartItem(expectedProductTitle: string){
        await this.shoppingCartItem.filter({ hasText: expectedProductTitle })
        .locator('button').click();
    }

    public async clickOnCheckoutButton(){
        this.clickElement(this.checkoutButton);
    }

    public async clickOnContinueShoppingButton(){
        this.clickElement(this.continueShoppingButton);
    }
}
