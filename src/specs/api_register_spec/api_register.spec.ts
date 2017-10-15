import * as assert from 'assert'
import { Router } from 'express'
let Common = require('../../api_register/api/common/common.register');
let Contact = require('../../api_register/api/contact/contact.register');
let Files = require('../../api_register/api/file/file.register');

describe("api_register", () => {
    let route: Router;
    beforeEach("instance of express router", () => {
        route = Router();
    });

    describe("common api", () => {
        it("should register common APIs routes", () => {
            assert.ok(new Common(route));
        });
    });

    describe("contact api", () => {
        it("should register contact APIs routes", () => {
            assert.ok(new Contact(route));
        });
    });

    describe("file api", () => {
        it("should register file APIs routes", () => {
            assert.ok(new Files(route));
        });
    });
});