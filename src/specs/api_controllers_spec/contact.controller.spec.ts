import 'mocha'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { ServerConfig } from '../../server'
import { stub, restore } from 'sinon'
import * as assert from 'assert'
import { Application, Router, Request, Response } from 'express'
import { GetContact } from '../../api_controllers/contacts/get_contact.controller'
import { DataService } from '../../dataService/mockdata_service'
chai.should();
chai.use(chaiHttp);

//#region GetContact Controllers Specs
describe("GetContact Controller", () => {
    let route: Router;
    let dataService: DataService.MockData;
    let server: string;
    beforeEach(() => {
        route = Router();
        dataService = new DataService.MockData();
        server = 'http://localhost:1810/api'
    });
    //#region All Get Requests Specs
    describe("getRequests:", () => {
        let getContact: GetContact.Controller;
        let contactapi: string;
        beforeEach(() => {
            getContact = new GetContact.Controller(route);
            contactapi = `${server}/contact`;
        });
        describe("/", () => {
            it("should return all contacs", (done) => {
                chai.request(contactapi).get("/").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a("array");
                    done();
                });
            });
        });

        describe("/:id", () => {
            it("should return specific contact", (done) => {
                chai.request(contactapi).get("/1").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a("object");
                    done();
                });
            });
            it("should fail for invalid id", (done) => {
                chai.request(contactapi).get("/90").end((err, res) => {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
            it("should fail for bad request", (done) => {
                chai.request(contactapi).get("/askjcnseiuz").end((err, res) => {
                    chai.expect(res).to.have.status(400);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
        });

        describe("/search_email", () => {
            it("should search contacts from email", (done) => {
                chai.request(contactapi).get("/search_email/mudit@gmail.com").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('array');
                    done();
                });
            });
            it("should fail for invalid email", (done) => {
                chai.request(contactapi).get("/search_email/mudit.com").end((err, res) => {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
        });

        describe("/search_gender", () => {
            it("should return contact by gender", (done) => {
                chai.request(contactapi).get("/search_gender/female").end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a("array");
                    done();
                });
            });
            it("should fail for invalid gender", (done) => {
                chai.request(contactapi).get("/search_gender/sdnczdkj").end((err, res) => {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
            });
        });
    });
    //#endregion
});
//#endregion