import {DateTime} from "luxon";

export class DateUtils {
    static readonly FORMAT_DDsMMsYYYY = /\d{2}\/\d{2}\/\d{4}/;
    static readonly FORMAT_YYYYsMMsDD = /\d{4}\/\d{2}\/\d{2}/;
    static readonly FORMAT_DD_MM_YYYY = /\d{2}-\d{2}-\d{4}/;
    static readonly FORMAT_YYYY_MM_DD = /\d{4}-\d{2}-\d{2}/;

    static textToDateTime(text: string, format?: string): DateTime {
        if(!format) {
            if(text.match(this.FORMAT_DDsMMsYYYY)) {
                format = `dd/MM/yyyy`;
            }
            else if(text.match(this.FORMAT_YYYYsMMsDD)) {
                format = `yyyy/MM/dd`;
            }
            else if(text.match(this.FORMAT_DD_MM_YYYY)) {
                format = `dd-MM-yyy`;
            }
            else if(text.match(this.FORMAT_YYYY_MM_DD)) {
                format = `yyyy-MM-dd`;
            }
            else {
                format = `yyyyMMdd`;
            }
        }
        return DateTime.fromFormat(text, format);
    }

    static getCurrentDate(): DateTime {
        return DateTime.now();
    }

    static getDateTimestamp(): string {
        return this.getCurrentDate().toFormat(`yyyyLLddHHmmssSSS`);
    }

    static getNthWeekDayAfterDate(date: DateTime, workDaysLater: number): DateTime {
        for(let i = 1; i <= workDaysLater; i++) {
            date = date.plus({days: 1});
            if (date.weekday === 6) {
                date = date.plus({days: 2});
            } else if (date.weekday === 7) {
                date = date.plus({days: 1})
            }
        }
        return date;
    }

    static getNextWeekDay(): DateTime {
        return this.getNthWeekDayAfterDate(this.getCurrentDate(), 1);
    }

    static getNthWeekDayAfterToday(workDaysLater: number) {
        return this.getNthWeekDayAfterDate(this.getCurrentDate(), workDaysLater);
    }
}