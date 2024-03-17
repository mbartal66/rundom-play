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

    public async validateNumberOfItems(elementsList: Locator, expectedNumberOfItems: number){
        await test.step(`Validating list of ${elementsList} elements has ${expectedNumberOfItems} items`, async() =>{
            expect(await elementsList.count()).toEqual(expectedNumberOfItems);
        })        
    }    

    protected async clickElement(element: Locator){
        await test.step(`Clicking the ${element} element`, async() =>{
            await element.click();
        });
    }

    protected async fillElement(element: Locator, inputText: string){
        await test.step(`Filling the ${element} element with ${inputText}`, async() =>{
            await element.fill(inputText);
        });
    }

    protected async typeTextInElement(element: Locator, inputText: string, delayMsec = 0){
        await test.step(`Typing  ${inputText} in the ${element} element`, async() =>{
            await element.pressSequentially(inputText, {delay: delayMsec});
        });
    }

    protected async selectOptionInElement(element: Locator, option: string){
        await test.step(`Selecting option $(option) from the $(element) element`, async() =>{
            await element.selectOption(option);
        })
    }

    protected async setCheckboxOff(element: Locator){
        await test.step(`Unchecking $(element) element`, async() =>{
            await element.uncheck();
        })
    }

    protected async setCheckboxOn(element: Locator){
        await test.step(`Checking $(element) element`, async() =>{
            await element.check();
        })
    }

    protected async verifyElementIsChecked(element: Locator){
        await test.step(`Verifying that the $(element) element is checked`, async() =>{
            expect(element).toBeChecked();
        })
    }

    protected async setRadioButtonOn(element: Locator){
        await test.step(`Setting radiobutton $(element) ON`, async() =>{
            await element.check();
        })
    }
}