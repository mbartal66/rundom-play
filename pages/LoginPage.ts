import { Locator, Page, expect } from "@playwright/test";
import GlobalConstants from "../helpers/GlobalConstants";
import { ErrorMessages } from "../helpers/ErrorMessagesEnum";
import { BasePage } from "./BasePage";

export default class LoginPage extends BasePage{
  
    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    constructor(protected page: Page){
        super(page);
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    public async loginToApplication(username = process.env.STANDARD_USER as string, 
        password = process.env.CORRECT_PASSWORD as string, 
        url = GlobalConstants.BASE_URL) {
        
            await this.page.goto(url);
            await this.validatePageUrl(url);
            /* await this.fillElement(this.usernameField, username);
            await this.fillElement(this.passwordField, password); */
            await this.typeTextInElement(this.usernameField, username, 100);
            await this.typeTextInElement(this.passwordField, password);

            await this.clickElement(this.loginButton);
    }


    public async valdateErrorMessage(errorMessage: ErrorMessages){
        this.validateElementText(this.errorMessage, errorMessage.valueOf());
    }

}