import { LoginPage } from "../pages";
import { LoginCookiePopup } from "../popup";


export class LoginFlow {
    protected readonly loginPage: LoginPage;
    protected readonly loginCookiePopup: LoginCookiePopup;

    constructor(loginPage: LoginPage, loginCookiePopup: LoginCookiePopup) {
        this.loginPage = loginPage;
        this. loginCookiePopup = loginCookiePopup;
    }

    async login(username: string, password: string) {
        await this.loginPage.waitForOnPage();

        await this.loginPage.setUsernameInputTo(username);
        await this.loginPage.setPasswordInputTo(password);

        await this.loginPage.clickSignIn();
        await this.loginCookiePopup.closeCookiePopupIfVisible();
    }
}