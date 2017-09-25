import * as express from 'express'

class ContactController {
    constructor(route: express.Router) {
        console.log(route);
    }
}
module.exports = ContactController;