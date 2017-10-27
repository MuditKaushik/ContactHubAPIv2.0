import { Router, Request, Response } from 'express'
import { CommonEnum } from '../../api_Utils/api_util.export'
import { Contact } from '../../api_Models/contact/contactModels'
import { DataService } from '../../dataService/mockdata_service'

export module PostContact {
    export class Controller {
        private _dataservice = new DataService.MockData();
        constructor(route: Router) {
            route.post("/filter", this.searchContact.bind(this));
        }
        searchContact(req: Request, res: Response) {
            let filters: Contact.IContactFilterModel = <Contact.IContactFilterModel>req.body,
                filterContacts = new Array<Contact.IContactModel>(),
                contacts: Array<Contact.IContactModel> = <Array<Contact.IContactModel>>this._dataservice.getMockData().contacts,
                hasFound: boolean = false;

            switch (parseInt(filters.criteria)) {
                case CommonEnum.ContactFilter.Name:
                    contacts.forEach((val, pos) => {
                        let fullName = `${val.firstName} ${val.middleName} ${val.lastName}`.toLowerCase();
                        let exist = fullName.match(`/(${filters.searchTerm})/`);
                        if (exist) {
                            hasFound = true;
                            filterContacts.push(val);
                        }
                    });
                    break;
                case CommonEnum.ContactFilter.Email:
                    contacts.forEach((val, pos) => {
                        if (val.email === filters.searchTerm) {
                            hasFound = true;
                            contacts.push(val);
                        }
                    });
                    break;
                case CommonEnum.ContactFilter.Gender:
                    contacts.forEach((val, pos) => {
                        if (val.gender === CommonEnum.ContactFilter[parseInt(filters.criteria)]) {
                            hasFound = true;
                            filterContacts.push(val);
                        }
                    });
                    break;
            }
            if (hasFound) {
                return res.status(200).send(filterContacts);
            }
            else {
                return res.status(404).send("no result found");
            }
        }
    }
}