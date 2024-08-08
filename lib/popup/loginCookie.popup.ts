import { Locator, Page } from "@playwright/test";
import { BasePopup } from ".";

export class LoginCookiePopup extends BasePopup {
    protected textHeader: Locator;
    protected containerPopup: Locator;

    private buttonAccept: Locator;
    private buttonCancel: Locator;

    constructor(page: Page) {
        super(page);
        this.setLocators(page);
    }

    setLocators(page: Page): void {
        this.containerPopup = page.getByRole(`dialog`);
        this.buttonAccept = page.getByRole(`button`, {name: `accept`});
    }

    async clickAcceptButton() {
        await this.buttonAccept.click();
    }

    async closeCookiePopupIfVisible() {
        if(await this.textHeader.isVisible()) {
            await this.clickAcceptButton();
        }
    }
    
}