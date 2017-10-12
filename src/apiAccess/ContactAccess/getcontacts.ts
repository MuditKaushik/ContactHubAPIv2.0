import { Router, Request, Response } from 'express'
import { DataService } from '../../dataService/mockdata_service'

export module GetContact {
    export class GetRequest {
        private _dataservice = new DataService.MockData();
        constructor(route: Router) {
            route.get("/", this.getContacts.bind(this));
            route.get("/:id", this.getContactById.bind(this));
            route.get("/email/:mail", this.getContactsByEmail.bind(this));
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
                            res.json({ status: 200, result: data });
                            return;
                        }
                    });
                    if (!hasFound) { return res.json({ status: 404, result: 'no result found!' }); }
                    break;
            }
        }
        getContactsByEmail(req: Request, res: Response) {
            let email: string = req.params.mail;
            let result = new Array();
            let hasFound: boolean = false;
            switch (typeof (email) === 'string') {
                case false:
                    res.json({ statuscode: 400, result: "bad request." });
                    break;
                case true:
                    let contacts: Array<any> = this._dataservice.getMockData().contacts;
                    contacts.forEach((contact) => {
                        if (contact.email === email) {
                            hasFound = true;
                            result.push(contact);
                        }
                    });
                    if (!hasFound) { return res.json({ statuscode: 404, result: "not found." }); }
                    else { return res.json({ statuscode: 200, result: result }); }
            }
        }
    }
}