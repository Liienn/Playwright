import { Page, TestInfo } from "@playwright/test";

export type TableRowField = string;
export type TableRowValue = string;
export type TableRowSource = string;
export type TableRowComment = string;
export type TableRow = [TableRowField, TableRowValue, TableRowSource, TableRowComment];
export type Table = TableRow[];

export const takeScreenshot = async (testInfo: TestInfo, page: Page) => {
    const screenshot = await page.screenshot();
    if (screenshot.length === 0) return;
    await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
    });
};

export class Reporting {
    protected readonly testInfo: TestInfo;
    protected tables: Record<string, Table>;

    constructor(testInfo: TestInfo) {
        this.testInfo = testInfo;
        this.tables = {};
    }

    async createTable(tableName: string) {
        this.tables[tableName] = [["Field", "Value", "Source", "Comment"]];
    }

    async addTableRow(tableName: string, tableRow: TableRow) {
        if(!this.tables[tableName]) await this.createTable(tableName);
        this.tables[tableName].push(tableRow);
    }

    async addNotations() {
        for(const [tableName, table] of Object.entries(this.tables)) {
            let tableHtml = "";

            tableHtml += `<figure class="table>"`;
            tableHtml += `<table>`;

            tableHtml += `<thread>`;
            tableHtml += `<tr>`;
            for(const cell of table.shift() ?? []) {
                tableHtml += `<th>${cell}</th>`;
            }
            tableHtml += `</tr>`;
            tableHtml += `</thread>`;

            tableHtml += `<tbody>`;
            for(const row of table) {
                tableHtml += `<tr>`;
                for(const cell of row) {
                    tableHtml += `<td>${cell}</td>`;
                }
                tableHtml += `</tr>`;
            }
            tableHtml += `</tbody>`;

            tableHtml += `</table>`;
            tableHtml += `</figure>`;

            this.testInfo.annotations.push({
                type: `html:${tableName}`,
                description: tableHtml,
            });
        }
    }
}