import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CartPage extends BasePage {

    private pageTitleElement: Locator;
    private shoppingCartItem: Locator;

    constructor(protected page: Page){
        super(page);
        this.pageTitleElement = page.locator('[class="title"]');
        this.shoppingCartItem = page.locator('[class="cart_item"]');
    }

    public async validateTitle(title: string){
        await this.validateElementText(this.pageTitleElement, title);
    }

    public async validateNumberOfCartItems(expectedNumberOfItems){
        this.validateNumberOfItems(this.shoppingCartItem, expectedNumberOfItems);
    }
}
