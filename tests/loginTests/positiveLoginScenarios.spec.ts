import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import GlobalConstants from "../../helpers/GlobalConstants";
import { PagesURL } from "../../helpers/PagesURLEnum";

test.describe("Positive Login Scenarios", () => {
    let loginPage: LoginPage;

    test.beforeEach(async({page}) =>{
        loginPage = new LoginPage(page);
    })

    test("Login with standard_user", async({page})=>{ 
        await loginPage.loginToApplication(process.env.STANDARD_USER, process.env.CORRECT_PASSWORD);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })

    test("Login with problem_user", async({page})=>{
        await loginPage.loginToApplication(process.env.PROBLEM_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })

    test("Login with performance_glitch_user", async({page})=>{
        await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
        await loginPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
    })
})