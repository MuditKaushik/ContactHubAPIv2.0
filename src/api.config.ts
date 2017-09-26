import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

export module ApiRouter {
    export class ApiConfig {
        private startFolder: string
        constructor() {
            this.startFolder = null;
        }
        configRoutes(app: express.Application, controller: string) {
            if (!this.startFolder) this.startFolder = controller;
            fs.readdirSync(controller).forEach((file) => {
                let fullPath = path.join(controller, file);
                let stat = fs.lstatSync(fullPath);
                switch (stat.isDirectory()) {
                    case true: this.configRoutes(app, fullPath); break;
                    case false:
                        if (file.toLowerCase().indexOf('.js') && file.toLowerCase().indexOf(".map") == -1) {
                            let dir = path.dirname(fullPath).split(path.sep);
                            if ((dir[0] + "/" + dir[1]).toLowerCase() === this.startFolder) {
                                dir.splice(0, 2);
                            }
                            const route = express.Router();
                            let baseRoute = "/" + dir.join("/");
                            console.log("Create Routes:" + baseRoute + " for " + fullPath);
                            const controllerFetch = require("../" + fullPath);
                            const controller = new controllerFetch(route);
                            app.use(baseRoute, route);
                        }
                        break;
                }
            });
        }

    }
}