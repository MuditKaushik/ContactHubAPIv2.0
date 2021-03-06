import { ApiRouter } from './api.config'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

export module ServerConfig {
    let server = express(),
        router = express.Router(),
        config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/server.config.json'), 'utf8'));

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.set("port", config.api.port);
    server.use(express.static(path.join(__dirname, "../docs")));

    export class ServerSetup {
        static _instance: ServerSetup = null;
        constructor() {
            this.enable_cors();
            this.api_setup();
            this.server_start();
        }
        static createInstance() {
            if (this._instance == null || this._instance == undefined)
                this._instance = new ServerSetup();
            return this._instance;
        }
        enable_cors(): void {
            server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }
        api_setup(): void {
            let apiPath = path.join(__dirname, "").split(path.sep).pop().concat("/api_register");
            let apiRoutes = new ApiRouter.ApiConfig().configRoutes(server, apiPath);
        }
        server_start(): void {
            server.get("/docs", (req, res) => {
                let swaggerPath = path.join(__dirname, "../docs/index.html");
                res.sendFile(swaggerPath);
            });
            server.listen(server.get("port"), () => {
                console.log(`Server starts at port ${server.get("port")}.`);
            });
        }
    }
}
ServerConfig.ServerSetup.createInstance();