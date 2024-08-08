import { Page } from "@playwright/test";
import { readFile } from "fs";

export abstract class Translatable {
    page: Page;
    abstract setLocators(page: Page): void;

    constructor(page: Page, registerForTranslate: boolean = true) {
        this.page = page;
        if(registerForTranslate) Translate.registerTranslatable(this);
    }
}

export class Translate {
    private static readonly supportedLanguages = {
        de: ["resources/languages/de.json", "resources/languages/de_other.json"],
        en: ["resources/languages/en.json", "resources/languages/en_other.json"],
        nl: ["resources/languages/nl.json", "resources/languages/nl_other.json"],
        fr: ["resources/languages/fr.json", "resources/languages/fr_other.json"],
    }

    private static readLanguageFiles(): Object {
        const readMappings = {};
        for(const [languageId, filePaths] of Object.entries(this.supportedLanguages)) {
            for(const filePath of filePaths) {
                readFile(filePath, "utf8", (err, data: string) => {
                    if(err) {
                        console.error(`Error occurred while reading ${languageId} file: ${err.message}`);
                        throw err;
                    }
                    try {
                        readMappings[languageId] = {...readMappings[languageId], ...JSON.parse(data)};
                    } catch(error) {
                        console.error(`Error occurred while parsing ${languageId} language file: ${error.message}`);
                    }
                });
            }
        }
        return readMappings;
    }

    private static currentLanguage: string = `en`;
    private static languageMappings: object = this.readLanguageFiles();
    private static translatables: Translatable[] = [];

    static registerTranslatable(page: Translatable): void {
        this.translatables.push(page);
    }

    static setLanguage(languageId: string): void {
        this.currentLanguage = languageId;
        for(const pageObject of this.translatables) pageObject.setLocators(pageObject.page);
    }

    static getTranslation(lookupInfo: TranslationLookup): string {
        let currentlyLoadedLanguageItems = this.languageMappings[this.currentLanguage];
        for(const parent of lookupInfo.parents) {
            currentlyLoadedLanguageItems = currentlyLoadedLanguageItems[parent]
        }
        return currentlyLoadedLanguageItems[lookupInfo.key];
    }
}

export interface TranslationLookup {
    parents: string[];
    key: string;
}