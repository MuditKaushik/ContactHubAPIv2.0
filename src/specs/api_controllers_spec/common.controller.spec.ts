import 'mocha'
import chai = require('chai');
import chaiHttp = require('chai-http')
import { Router } from 'express'
import { DataService } from '../../dataService/mockdata_service'
chai.should();
chai.use(chaiHttp);

describe("Common Controllers", () => {
    let commonApi: string;
    let countries: Array<any>;
    beforeEach(() => {
        commonApi = `http://localhost:1810/api/common`;
        countries = new DataService.MockData().getCountries();
    });
    //#region Get Requests Spec
    describe("getRequests:", () => {
        describe("/gender", () => {
            it("should return all gender types", (done) => {
                chai.request(commonApi).get("/gender").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.instanceOf(Array);
                    done();
                });
            });
        });
        describe("/countries", () => {
            it("should return all countries", (done) => {
                chai.request(commonApi).get('/countries').end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a.instanceOf(Array);
                    done();
                });
            });
        });
        describe("/searchcriteria", () => {
            it("should return search criteria", (done) => {
                chai.request(commonApi).get("/searchcriteria").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a.instanceOf(Array);
                    done();
                });
            });
        });
    });
    //#endregion
});