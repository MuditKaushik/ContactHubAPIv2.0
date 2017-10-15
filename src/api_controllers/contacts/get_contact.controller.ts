import { Router, Request, Response } from 'express'
import { DataService } from '../../dataService/mockdata_service'

export module GetContact {
    export class Controller {
        private _dataservice = new DataService.MockData();
        constructor(route: Router) {
            route.get("/", this.getContacts.bind(this));
            route.get("/:id", this.getContactById.bind(this));
            route.get("/search_email/:email", this.getContactByEmail.bind(this));
            route.get("/search_gender/:gender", this.getContactByGender.bind(this));
        }
        getContacts(req: Request, res: Response) {
            return res.status(200).send(this._dataservice.getMockData().contacts);
        }
        getContactById(req: Request, res: Response) {
            let id = req.params.id;
            let hasFound: boolean = false;
            switch (isNaN(id)) {
                case true: return res.status(400).send("bad request!");
                case false:
                    let contacts: Array<any> = this._dataservice.getMockData().contacts;
                    contacts.forEach((data) => {
                        if (parseInt(id) === data._id) {
                            hasFound = true;
                            return res.status(200).send(data);
                        }
                    });
                    if (!hasFound) { return res.status(404).send('no result found!'); }
                    break;
            }
        }
        getContactByEmail(req: Request, res: Response) {
            let email = req.params.email, hasFound: boolean = false;
            switch (typeof (email) === 'string') {
                case false: return res.status(400).send({ result: "bad request" });
                case true:
                    let contacts = new Array();
                    let contactList: Array<any> = this._dataservice.getMockData().contacts;
                    contactList.forEach((val) => {
                        if (val.email === email) {
                            hasFound = true;
                            contacts.push(val);
                        }
                    });
                    if (hasFound) { return res.status(200).send(contacts); }
                    else {
                        return res.status(404).send("no contact found.");
                    }
            }
        }
        getContactByGender(req: Request, res: Response) {
            let gender = req.params.gender, hasFound: boolean = false;
            switch (typeof (gender) === "string") {
                case false: return res.status(400).send("bad request");
                case true:
                    let contacts = new Array();
                    let contactList: Array<any> = this._dataservice.getMockData().contacts;
                    contactList.forEach((contact) => {
                        if (contact.gender === gender) {
                            hasFound = true;
                            contacts.push(contact);
                        }
                    });
                    return (hasFound) ? res.status(200).send(contacts) :
                        res.status(404).send("no contact found.");
            }
        }
    }
}