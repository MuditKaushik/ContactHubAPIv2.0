import * as fs from 'fs'
import * as path from 'path'

export module DataService {
    export class MockData {
        private filePath: string;
        private mockData: any;
        constructor() {
            this.filePath = path.join(__dirname, '../../config/mockdata.json');
            this.mockData = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
        }
        getMockData(): any {
            return this.mockData;
        }
        getCountries(): any {
            let filePath = path.join(__dirname, '../../config/country.json');
            let countries = JSON.parse(fs.readFileSync(filePath, "utf8"));
            return countries;
        }
    }
}