import { Request, Response, Router } from 'express'
import { DataService } from '../../dataService/mockdata_service'

export module RemoveContact {
    export class RemoveRequest {
        constructor(route: Router) { }
    }
}