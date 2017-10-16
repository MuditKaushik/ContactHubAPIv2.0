import { Router, Request, Response } from 'express'
import { DataService } from '../../dataService/mockdata_service'

export module GetCommon {
    export class Controller {
        _dataService = new DataService.MockData();
        constructor(route: Router) {
            route.get('/gender', this.get_gender.bind(this));
            route.get('/countries', this.get_countries.bind(this));
        }
        get_gender(req: Request, res: Response) {
            return res.status(200).send(this._dataService.getMockData().gender);
        }
        get_countries(req: Request, res: Response) {
            return res.status(200).send(this._dataService.getCountries().country);
        }
    }
}