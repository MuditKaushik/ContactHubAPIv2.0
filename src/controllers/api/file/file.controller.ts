import { Router, Request, Response } from 'express'
import { DataService } from '../../../dataService/mockdata_service'
class FileController {
    private _dataservice = new DataService.MockData();
    constructor(route: Router) {
        route.get("/", this.getFiles.bind(this));
        route.get("/:id", this.getFileById.bind(this));
    }
    getFiles(req: Request, res: Response) {
        return res.status(200).send(this._dataservice.getMockData().files);
    }
    getFileById(req: Request, res: Response) {
        let id = req.params.id, hasFound: boolean = false;
        switch (isNaN(id)) {
            case true: return res.status(400).send("bad request.");
            case false:
                let fileList: Array<any> = this._dataservice.getMockData().files;
                fileList.forEach((file) => {
                    if (file._id === parseInt(id)) {
                        hasFound = true;
                        return res.status(200).send(file);
                    }
                });
                if (!hasFound) { return res.status(404).send("no record found."); }
        }
    }
}
module.exports = FileController;