import { Locator, Page, expect } from "@playwright/test";
import UserCredentials from "../helpers/UserCredentials";
import ApplicationURL from "../helpers/ApplicationURL";

export default class LoginPage {
  
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(protected page: Page){
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
    }

    public async loginToApplication(username = UserCredentials.STANDARD_USER, 
        password = UserCredentials.CORECT_PASSWORD, 
        url = ApplicationURL.BASE_URL) {
        
            await this.page.goto(url);
            await this.validatePageUrl(url);
            await this.usernameField.fill(username);
            await this.passwordField.fill(password);
            await this.loginButton.click(); 
            await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`);       
    }

    public async validatePageUrl(url: string){
        await expect(this.page).toHaveURL(url);

    }

}