import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

export module ApiRouter {
    export class ApiConfig {
        private serverApp: express.Application
        private controllers: string
        constructor(app: express.Application, controller: string) {
            this.serverApp = app;
            this.controllers = controller;
        }
        configRoutes() { 
            
        }
    }
}