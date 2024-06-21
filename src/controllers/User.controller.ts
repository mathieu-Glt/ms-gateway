import express, { Response, Request, NextFunction } from "express";
import { UserService } from "../services/User.services";
import { User } from "../entities/User.entity";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import NatsService from "../nats";
import { AuthenticatedRequest } from "../interface/decode.interface";
// import { emit } from "../nats";
// import { NatsMessengerService } from "../nats";




export class UserController {

    command: string;

    private userService = new UserService();
    // private natsMessengerService: NatsMessengerService;

    constructor(command: string) {
        this.command = command;
    }


    async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date:Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);

        try {
            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
                console.log('he is admin !');

            const nats = new NatsService()
            const users = await nats.send("GET_USERS", req.body);
            console.log("🚀 ~ UserController ~ userCheck:", users)

            return { results: users, error: false, message: "Users found", status: 200, date: new Date() }
            
        } else {
            console.log('he isn\'t admin !');

            return { error: true, message: "Unauthorized Access", status: 401 }

        }

        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }

    async getOne(req: AuthenticatedRequest, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date:Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);

        try {
            console.log("req.params", req.params);
            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
                console.log('he is admin !');

            
            const nats = new NatsService()
            const user = await nats.send("GET_USER_BY_ID", req.params);
   
            // let user = await this.userService.getOne(req.params.id)         
            console.log("🚀 ~ UserController ~ user:", user)
            return { results: user, error: false, message: "Result found", status: 200, date: new Date() }
            // return { data: {user}, message: "Here the result", date: new Date()}
            // res.status(200).json({
            //     msg: 'Here is the results', data: products,  date: new Date()
            // })
    
        } else {
            console.log('he isn\'t admin !');

            return { error: true, message: "Unauthorized Access", status: 401 }

        }

        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }

    async putUser(req: AuthenticatedRequest, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date:Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);



        try {
            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
            console.log('he is admin !');

            console.log("req.body", req.body);
            let updateUser = {
                ...req.body,
                id: req.params.id
            }
            
            const nats = new NatsService()
            const user = await nats.send("PUT_USER_BY_ID", updateUser);

            // return { data: {userUpdate}, message: "Here the result updated", date: new Date()}
            return { results: user, error: false, message: "User has been updated", status: 200, date: new Date() }
        } else {
            console.log('he isn\'t admin !');

            return { error: true, message: "Unauthorized Access", status: 401 }

        }
                
        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }

        
    }


    async patchUser(req: AuthenticatedRequest, res: Response, next: NextFunction)
    // :Promise<{data: {}, message: string, date:Date}>
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);

        try {

            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
            console.log('he is admin !');

            const { id } = req.params;
            const body: Partial<User> = req.body;
            console.log("boduuuy", body);
            console.log("id", id);
            let updateUser = {
                ...req.body,
                id: req.params.id
            }
            console.log('updateUser', updateUser);

            const nats = new NatsService()
            const user = await nats.send("PATCH_USER_BY_ID", updateUser);


            // return { data: {userUpdatePatch}, message: "Here the result updated", date: new Date()}
            return { results: user, error: false, message: "Field user has been updated", status: 200, date: new Date() }
            } else {
                console.log('he isn\'t admin !');

                return { error: true, message: "Unauthorized Access", status: 401 }
    
            }
                
        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }

    async deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<any>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);

        try {
            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
                console.log('he is admin !');

            const { id } = req.params;
            console.log("deleteUser", id);

            const nats = new NatsService() // DELETE_USER
            const userDelete = await nats.send("DELETE_USER", id)

            return { results: userDelete, error: false, message: "User has been deleted", status: 200, date: new Date() }
           
            } else {
                console.log('he isn\'t admin !');

                return { error: true, message: "Unauthorized Access", status: 401 }

            }
            
        } catch (error) {
            // res.status(500).json({ status: 500, msg: error.message})
            return { error: true, message: error.message, status: 500 }

        }
    }

    
}