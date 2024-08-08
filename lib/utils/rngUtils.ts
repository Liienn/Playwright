import * as crypto from "crypto";

export class RngUtils {
    static getRandomNumber(lowest?: number, highest?: number): number {
        const _lowest = lowest ?? 0;
        const _highest = highest ?? 1;
        return Math.round(Math.random() * (_highest - _lowest) + _lowest); 
    }

    private static getXDigitRandomNumber(digits: number): number {
        const wantedMagnitude = Math.pow(10, digits -1);
        return Math.floor(Math.random() * (wantedMagnitude * 9)) + wantedMagnitude;
    }

    static get6DigitRandomNumber(): number {
        return this.getXDigitRandomNumber(6);
    }

    static getRandomItemFrom<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    // https://stackoverflow.com/a/51540480
    static getBasicPassword(length?: number): string {
        const _length = length ?? 16;
        const remainder = _length % 4;
        const numbers = "0123456789";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const special = "~!@-#$";
        const amountOfAvailableChars = numbers.length + uppercase.length + lowercase.length + special.length;
        const amountOfNumbers = Math.round(_length * (numbers.length / amountOfAvailableChars));
        const amountOfUppercase = Math.round(_length * (uppercase.length / amountOfAvailableChars));
        const amountOfLowercase = Math.round(_length * (lowercase.length / amountOfAvailableChars));
        const amountOfSpecial = Math.round(_length * (special.length / amountOfAvailableChars));
        const amountOfChars = amountOfNumbers + amountOfUppercase + amountOfLowercase + amountOfSpecial;
        const errorCorrectionSpecial = amountOfChars != _length && remainder > 0 ? 1 : 0;
        const errorCorrectionNumbers = amountOfChars != _length && remainder > 1 ? 1 : 0;
        const errorCorrectionUppercase = amountOfChars != _length && remainder > 2 ? 1 : 0;
        const errorCorrectionLowercase =
            amountOfChars != _length && amountOfChars + remainder != _length
                ? _length - (amountOfChars + remainder)
                : 0;
        const specialSegment = Array.from(
            crypto.randomFillSync(new Uint32Array(amountOfSpecial + errorCorrectionSpecial)),
        )
            .map((x) => special[x % special.length])
            .join("");
        const numbersSegment = Array.from(
            crypto.randomFillSync(new Uint32Array(amountOfNumbers + errorCorrectionNumbers)),
        )
            .map((x) => numbers[x % numbers.length])
            .join("");
        const uppercaseSegment = Array.from(
            crypto.randomFillSync(new Uint32Array(amountOfUppercase + errorCorrectionUppercase)),
        )
            .map((x) => uppercase[x % uppercase.length])
            .join("");
        const lowercaseSegment = Array.from(
            crypto.randomFillSync(new Uint32Array(amountOfLowercase + errorCorrectionLowercase)),
        )
            .map((x) => lowercase[x % lowercase.length])
            .join("");
        return `${numbersSegment}${uppercaseSegment}${lowercaseSegment}${specialSegment}`;
    }
}