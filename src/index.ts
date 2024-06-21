import express, { Response, Request, NextFunction } from "express";
import 'dotenv/config';
// import { Routes } from "./routes";
import bodyParser from "body-parser";
// import { NatsMessengerService } from "./nats";
// import { dataBaseSource } from "./data-source";
import { Routes } from "./routes";
import { JwtMiddlewareAuth } from "./middlewares/Jwt.middleware";

// dataBaseSource.AppDataSource.initialize().then(async()=>{
    require('dotenv').config()
    const app = express();
    app.use(bodyParser.json())
    // app.use(JwtMiddlewareAuth);
    const port = process.env.PORT
    
    


    Routes.forEach(route => {
        const routeHandler = async (req: Request, res: Response, next: NextFunction) => {
            console.log(`Route invoked: ${route.route}`);
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                      .catch(err => next(err));
            } else if (result !== null && result !== undefined) {
                res.send(result);
            }
        };

        if (route.middleware) {
            console.log(`Registering route with middleware: ${route.route}`);
            (app as any)[route.method](route.route, ...route.middleware, routeHandler);
        } else {
            console.log(`Registering route without middleware: ${route.route}`);
            (app as any)[route.method](route.route, routeHandler);
        }
    });


    
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
        
    })
    
// })


