import { Router, Request, Response } from 'express'
import { DataService } from '../../dataService/mockdata_service'

export module PostContact {
    export class Controller {
        private _dataservice = new DataService.MockData();
        constructor(route: Router) {
            route.post("/searchcontact", this.searchContact.bind(this));
        }
        searchContact(req: Request, res: Response) {
            let body = req.body;
            console.log(body);
        }
    }
}