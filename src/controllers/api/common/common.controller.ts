import { Router } from 'express'
import { GetCommon } from '../../../api_access/common/get_common.controller'
module Common {
    export class CommonController {
        constructor(route: Router) {
            new GetCommon.CommonController(route);
        }
    }
}

module.exports = Common.CommonController;