import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class ProductsPage extends BasePage {

    private pageTitleElement: Locator;
    private itemDescriptionElement: Locator;
    private shoppingCartElement: Locator;

    constructor(protected page: Page){
        super(page);
        this.pageTitleElement = page.locator('[class="title"]');
        this.itemDescriptionElement = this.page.locator('[class="inventory_item_description"]');
        this.shoppingCartElement = this.page.locator('a[class="shopping_cart_link"]');
    }

    public async validateTitle(title: string){
        await this.validateElementText(this.pageTitleElement, title);
    }

    public async chooseProductByTitle(expectedProductTitle: string){        
        await this.itemDescriptionElement.filter({ hasText: expectedProductTitle })
            .locator('button').click();
    }

    public async chooseProductsByTitle(expectedProductTitlesArray: Array<string>){
        for(let i=0; i<expectedProductTitlesArray.length; i++){
            await this.chooseProductByTitle(expectedProductTitlesArray[i]);
        }
    }
    /* public async chooseProductByTitle(expectedproductTitle: string){
        for(let product of await this.itemDescriptionElement.all()){
            const productTitle = await product.locator('[class="inventory_item_name"]').innerText();
            if(productTitle  === expectedproductTitle){
                await product.locator('button').click();
            }
        }
    } */

    public async validateNumberOfItemsInCart(expectedNumberOfItems: string) {
        await this.validateElementText(this.shoppingCartElement, expectedNumberOfItems);
    }

    public async gotoCart(){
        this.clickElement(this.shoppingCartElement);
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(
            (resolve)  => setTimeout(resolve, ms));
    }
    
}