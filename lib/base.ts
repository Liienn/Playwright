import {test as base, expect as baseExpect} from "@playwright/test";
import {takeScreenshot, Reporting} from "./reporting";
import { LoginFlow } from "./flows/login.flow";

export const test = base.extend<
    {
        reporting: Reporting;

        //PAGES

        //POPUPS

        //API

        //FLOWS
        loginFlow: LoginFlow;
    } 
>({


})

export const expect = baseExpect.extend({
    async toContainAnyOfGivenTexts(received: string, possibilities: string[], options?: {ignoreCase?: boolean}) {
        if(options?.ignoreCase) {
            const result = possibilities.findIndex((element: string) => {
                if(received.toLowerCase().includes(element.toLowerCase())) {
                    return true;
                }
            });
            if(result) {
                return {
                    message: () => "passed",
                    pass: true,
                };
            }
        } else if (possibilities.includes(received)) {
            return {
                message: () => "passed",
                pass: true,
            };
        }

        return {
            message: () => `failed: '${received}' was not any of ${possibilities}`,
            pass: false,
        }
    },
});

test.beforeEach(async ({browserName, reporting}) => {
    await reporting.addTableRow("Test data", ["Browser name", browserName, "Playwright", ""]);
});

test.afterEach(async ({page, reporting}) => {
    await reporting.addNotations();
    await takeScreenshot(base.info(), page);
});