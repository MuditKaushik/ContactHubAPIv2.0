import * as express from 'express'
import { DataService } from '../../../dataService/mockdata_service'

export module Contact {
    export class ContactController {
        private _dataservice = new DataService.MockData();
        constructor(route: express.Router) {
            route.get("/", this.getContacts.bind(this));
        }

        getContacts(req: express.Request, res: express.Response) {
            return res.send(this._dataservice.getContacts().contacts);
        }
    }
}
module.exports = Contact.ContactController;