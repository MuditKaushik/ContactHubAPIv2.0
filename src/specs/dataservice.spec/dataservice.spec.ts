import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import { DataService } from '../../dataService/mockdata_service'

describe("dataservice", () => {
    let filePath: string = path.join(__dirname, '../../../config/mockdata.json');
    let mockData: any = JSON.parse(fs.readFileSync(filePath, "utf8"));
    let dataService: DataService.MockData;

    beforeEach("create instance", () => {
        dataService = new DataService.MockData();
    });

    describe("getMockMethod", () => {
        it("should return json data", () => {
            assert.deepEqual(dataService.getMockData(), mockData);
        });
    });

    describe("getCountries", () => {
        it("should return countries in json", () => {
            let countryPath: string = path.join(__dirname, '../../../config/country.json');
            let countries = JSON.parse(fs.readFileSync(filePath, "utf8"));
            assert.deepEqual(dataService.getCountries().country, countries.country);
        });
    });

});