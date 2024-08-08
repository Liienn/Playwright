import { Page } from "@playwright/test";
import { BasePage } from ".";

export class LoginPage extends BasePage {

    setLocators(page: Page): void {
        throw new Error("Method not implemented.");
    }

    waitForOnPage() {
        throw new Error("Method not implemented.");
    }
    setUsernameInputTo(username: string) {
        throw new Error("Method not implemented.");
    }
    setPasswordInputTo(password: string) {
        throw new Error("Method not implemented.");
    }
    clickSignIn() {
        throw new Error("Method not implemented.");
    }
}