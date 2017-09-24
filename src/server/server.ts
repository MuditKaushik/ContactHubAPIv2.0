import { ApiRouter } from './apiRoutes'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

export module ServerConfig {
    let server = express(),
        router = express.Router(),
        config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/server.config.json'), 'utf8'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    export class ServerSetup {
        static _instance: ServerSetup = null;
        constructor() {
            this.setup();
        }
        static createInstance() {
            if (this._instance == null || this._instance == undefined)
                this._instance = new ServerSetup();
            return this._instance;
        }
        setup(): void {
            let apiRoutes = new ApiRouter.ApiConfig(server, './api').configRoutes();
        }
        start(): void {
        }
    }
}
ServerConfig.ServerSetup.createInstance();