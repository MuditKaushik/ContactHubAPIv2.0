import { Router } from 'express'
import { GetCommon } from '../../../api_controllers/common/get_common.controller'

module Common {
    export class CommonController {
        constructor(route: Router) {
            new GetCommon.Controller(route);
        }
    }
}

module.exports = Common.CommonController;