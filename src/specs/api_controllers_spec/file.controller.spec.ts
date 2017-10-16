import 'mocha'
import chai = require('chai')
import chaiHttp = require('chai-http')
chai.should();
chai.use(chaiHttp);

describe("File Controllers", () => {
    let fileApi: string;
    beforeEach("bind file api", () => {
        fileApi = `http://localhost:1810/api/file`;
    });

    //#region File APIs Get Requests Specs
    describe("getRequests:", () => {
        describe("/", () => {
            it("should return all user created files", (done) => {
                chai.request(fileApi).get("/").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a.instanceOf(Array);
                    done();
                });
            });
        });
        describe("/:id", () => {
            it("should return file with matching id", (done) => {
                chai.request(fileApi).get("/1").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a.instanceOf(Object);
                    done();
                });
            });
            it("should return null if match not found", (done) => {
                chai.request(fileApi).get("/90").end((err, res) => {
                    chai.expect(res).to.has.status(404);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
            it("should return bad request for invalid id", (done) => {
                chai.request(fileApi).get("/asdkfj").end((err, res) => {
                    chai.expect(res).to.have.status(400);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
        });
    });
    //#endregion
});