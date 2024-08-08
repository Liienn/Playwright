import * as base64 from "base64-js";
import * as fs from "fs";
import * as util from "util";

export class Base64Utils {
    private static readFile = util.promisify(fs.readFile);

    static async imageToBase64(filePath: string): Promise<string> {
        try {
            const imageBuffer = await this.readFile(filePath);
            return imageBuffer.toString("base64");
        } catch (error) {
            throw new Error(`Failed to read image from path: ${filePath}. Error: ${error.message}`)
        }
    }

    static codeToBase64(str: string): string {
        const bytes = new TextEncoder().encode(str);
        return base64.fromByteArray(bytes);
    }

    static decodeFromBase64(base64Str: string): string {
        const bytes = base64.toByteArray(base64Str);
        return new TextDecoder().decode(bytes);
    }
}