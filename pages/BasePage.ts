import { Locator, Page, expect, test } from "@playwright/test";

export abstract class BasePage {

    constructor(protected page: Page){

    }
    
    public async validatePageUrl(url: string){
        await test.step(`Validation that the observed page URL is ${url} as expected`, async() =>{
            await expect(this.page).toHaveURL(url);  
        }, { box: true});
    }
    
    protected async validateElementText(elem: Locator, expectedText: string){
        await test.step(`Validation that the observed element text is ${expectedText} as expected.`, async() =>{
            await expect(elem).toContainText(expectedText);
        }, { box: true});
    }

}