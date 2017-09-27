import { Router, Request, Response } from 'express'
import { DataService } from '../../../dataService/mockdata_service'

export module Contact {
    export class ContactController {
        private _dataservice = new DataService.MockData();
        constructor(route: Router) {
            route.get("/", this.getContacts.bind(this));
            route.get("/:id", this.getContactById.bind(this));
        }
        getContacts(req: Request, res: Response) {
            return res.send(this._dataservice.getMockData().contacts);
        }
        getContactById(req: Request, res: Response) {
            let id = req.params.id;
            let hasFound: boolean = false;
            switch (isNaN(id)) {
                case true: return res.json({ status: 400, result: "bad request!" });
                case false:
                    let contacts: Array<any> = this._dataservice.getMockData().contacts;
                    contacts.forEach((data) => {
                        if (parseInt(id) === data._id) {
                            hasFound = true;
                            return res.json({ status: 200, result: data });
                        }
                    });
                    if (!hasFound) { return res.json({ status: 404, result: 'no result found!' }); }
                    break;
            }
        }
    }
}
module.exports = Contact.ContactController;