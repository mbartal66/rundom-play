import { Locator, Page, expect } from "@playwright/test";
import UserCredentials from "../helpers/UserCredentials";
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

    public async loginToApplication(username = UserCredentials.STANDARD_USER, 
        password = UserCredentials.CORECT_PASSWORD, 
        url = GlobalConstants.BASE_URL) {
        
            await this.page.goto(url);
            await this.validatePageUrl(url);
            await this.usernameField.fill(username);
            await this.passwordField.fill(password);
            await this.loginButton.click();
    }


    public async valdateErrorMessage(errorMessage: ErrorMessages){
        this.validateElementText(this.errorMessage, errorMessage.valueOf());
    }

}