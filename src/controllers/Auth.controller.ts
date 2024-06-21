import express, { Response, Request, NextFunction } from "express";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import NatsService from "../nats";


export class AuthController {

    command: string;


    constructor(command: string) {
        this.command = command;
    }


    async login(req: Request, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date: Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {console.log("body", req.body);
    
        try {
            const nats = new NatsService()
            const user = await nats.send("LOGIN", req.body);

            // let user = await this.userService.create(req.body)
            // console.log("🚀 ~ UserController ~ user:", user)
            return { results: user, error: false, message: "User logged", status: 200, date: new Date() }
        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("body", req.body);
        try {
            const nats = new NatsService()
            const user = await nats.send("FORGOT_PASSWORD", req.body);
            return { results: user, error: false, message: "link created for change password", status: 200, date: new Date() }


        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers ~ refreshToken", req.headers);
        console.log("voici le req.headers ~ refreshToken", req.headers['x-gate-user']);

        let user: string | string[] | undefined;
        const headerValue = req.headers['x-gate-user'];

        if (Array.isArray(headerValue)) {
          user = headerValue[0];
        } else {
          user = headerValue;
        }
        let parsedUser: string
        if (typeof user === 'string') {
          try {
            parsedUser = JSON.parse(user);
            console.log("parsedUser ~ refreshToken", parsedUser);


            // Use parsedUser as needed
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }

          const nats = new NatsService()
          const userRefreshToken = await nats.send("REFRESHTOKEN", parsedUser)
          console.log("parsedUser ~ userRefreshToken", userRefreshToken);

          return { results: userRefreshToken, error: false, message: `Yours tokens has been updated`, status: 200, date: new Date() }

        } else {
          console.error('Header x-gate_user is not a valid string');
        }
        try {
            
        } catch (error) {
            return { error: true, message: error.message, status: 500 }
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("params", req.params);
        console.log("body", req.body);

        const data = {
            tokenUuid: req.params,
            body: req.body
        }

        console.log('====================================');
        console.log(data);
        console.log('====================================');

        try {
            const nats = new NatsService()
            const userChangePass = await nats.send("CHANGE_PASSWORD", data)

            return { results: userChangePass, error: false, message: `Your password has been updated`, status: 200, date: new Date() }


        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }
    }



    async register(req: Request, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date: Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {console.log("body", req.body);
    
        try {
            const nats = new NatsService()
            const user = await nats.send("REGISTER", req.body);

            // let user = await this.userService.create(req.body)
            // console.log("🚀 ~ UserController ~ user:", user)
            return { results: user, error: false, message: "User created", status: 201, date: new Date() }
        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }


    



}