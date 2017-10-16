import 'mocha'
import chai = require('chai');
import chaiHttp = require('chai-http')
import { Router } from 'express'
chai.should();
chai.use(chaiHttp);

describe("Common Controllers", () => {
    let commonApi: string;
    beforeEach(() => {
        commonApi = `http://localhost:1810/api/common`
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
    });
    //#endregion
});