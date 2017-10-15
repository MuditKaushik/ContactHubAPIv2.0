import { Router, Request, Response } from 'express'
import { GetFiles } from '../../../api_controllers/files/get_files.controller'
import { } from '../../../api_controllers/files/post_files.controller'
import { } from '../../../api_controllers/files/put_files.controller'
import { } from '../../../api_controllers/files/remove_files.controller'

module Files {
    export class FileController {
        constructor(route: Router) {
            new GetFiles.Controller(route);
        }
    }
}
module.exports = Files.FileController;