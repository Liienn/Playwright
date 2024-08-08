import { Locator, Page, expect } from "@playwright/test";
import { Translatable } from "../../utils";

export abstract class BasePopup extends Translatable {
    protected abstract containerPopup: Locator;
    protected abstract textHeader: Locator;

    constructor(page: Page, registerForTranslatable?: boolean) {
        super(page, registerForTranslatable ?? true);
    }

    async expectPopupToBeVisible() {
        await expect(this.containerPopup).toBeVisible();
        await expect(this.textHeader).toBeVisible();
    }

    async expectPopupToBeHidden() {
        await expect(this.containerPopup).toBeHidden();
        await expect(this.textHeader).toBeHidden();
    }
}