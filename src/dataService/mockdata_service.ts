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
        getContacts(): any {
            return this.mockData;
        }
    }
}