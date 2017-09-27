import { Router, Request, Response } from 'express'
import { DataService } from '../../../dataService/mockdata_service'
class FileController {
    private _dataservice = new DataService.MockData();
    constructor(route: Router) {
        route.get("/", this.getFiles.bind(this));
        route.get("/:id", this.getFileById.bind(this));
    }
    getFiles(req: Request, res: Response) {
        return res.json({ status: 200, result: this._dataservice.getMockData().files });
    }
    getFileById(req: Request, res: Response) {
        let id = req.params.id, hasFound: boolean = false;
        switch (isNaN(id)) {
            case true: return res.json({ status: 400, result: "bad request." });
            case false:
                let fileList: Array<any> = this._dataservice.getMockData().files;
                fileList.forEach((file) => {
                    if (file._id === parseInt(id)) {
                        hasFound = true;
                        return res.json({ status: 200, result: file });
                    }
                });
                if (!hasFound) { return res.json({ status: 404, result: "no record found." }); }
        }
    }
}
module.exports = FileController;