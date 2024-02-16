import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import GlobalConstants from "../../helpers/GlobalConstants";
import UserCredentials from "../../helpers/UserCredentials";
import { PagesURL } from "../../helpers/PagesURLEnum";

test.describe("Positive Login Scenarios", () => {
    let loginPage: LoginPage;

    test.beforeEach(async({page}) =>{
        loginPage = new LoginPage(page);
    })

    test("Login with standard_user", async({page})=>{ 
        await loginPage.loginToApplication(UserCredentials.STANDARD_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })

    test("Login with problem_user", async({page})=>{
        await loginPage.loginToApplication(UserCredentials.PROBLEM_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })

    test("Login with performance_glitch_user", async({page})=>{
        await loginPage.loginToApplication(UserCredentials.PERFORMANCE_GLITCH_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })
})