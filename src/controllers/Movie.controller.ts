import express, { Response, Request, NextFunction } from "express";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import NatsService from "../nats";
import { AuthenticatedRequest } from "../interface/decode.interface";



export class MovieController {

    command: string;


    constructor(command: string) {
        this.command = command;
    }


    async createMovie(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);
    
        console.log("body", req.body);
        try {
            const nats = new NatsService()
            const userRole = req.roleUser;
        if(userRole === 'ADMIN') {
            console.log('he is admin !');
            
            const movie = await nats.send("CREATE_MOVIE", req.body)

            return { results: movie, error: false, message: "Movie created", status: 201, date: new Date() }

        } else {
            console.log('he isn\'t admin !');

            return { error: true, message: "Unauthorized Access", status: 401 }

        }


        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }  
    }

    async getAllMovies(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        // console.log("userId", req.headers['x-gate-user']);
        // console.log("voici le req.headers.userId", req.userId);
        // console.log("voici le req.headers.userRole", req.roleUser);


        // const userIdHeader = req.headers['x-gate-user'];
        // if (typeof userIdHeader === 'string') {
        //     const userIdObject = JSON.parse(userIdHeader);
        //     console.log("userId", userIdObject);
        // } else {
        //     console.error("Invalid userIdHeader format");
        // }
        

        try {
            const nats = new NatsService()
            const movies = await nats.send("GET_MOVIES", req.body.id)
            console.log("🚀 ~ MovieController ~ movies:", movies)

            return { results: movies, error: false, message: "Movies found", status: 200, date: new Date() }

        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }
    }

    async getOneMovie(req: Request, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        try {
            console.log("req.params", req.params);
            console.log("req.body", req.body);
            const idParams = req.params.id;
            const idBody = req.body.id
           
            const nats = new NatsService()
            const movie = await nats.send("GET_MOVIE_BY_ID", idParams)
            return { results: movie, error: false, message: "Result found", status: 200, date: new Date() }


        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }
    }

    async updateMovie(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);

        console.log("req.body", req.body);
        console.log("req.params", req.params);
        try {
            const obj = {
                id: req.params.id,
                body: req.body
            }
            console.log("objet", obj);
            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
                console.log('he is admin !');

            const nats = new NatsService()
            const movie = await nats.send("UPDATE_MOVIE", obj)

            return { results: movie, error: false, message: "Movie updated", status: 200, date: new Date() }
            } else {
                console.log('he isn\'t admin !');

                return { error: true, message: "Unauthorized Access", status: 401 }
    
            }

        } catch (error) {
            return { error: true, message: error.message, status: 500 }
 
        }
    }

    async deleteMovie(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("req.params", req.params);
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);


        try {

            const userRole = req.roleUser;
            if(userRole === 'ADMIN') {
            console.log('he is admin !');

            const idParams = req.params.id;

            const nats = new NatsService()
            const movieDelete = await nats.send("DELETE_MOVIE", idParams)

            return { results: movieDelete, error: false, message: "Movie deleted", status: 200, date: new Date() }
            } else {
                console.log('he isn\'t admin !');

                return { error: true, message: "Unauthorized Access", status: 401 }

            }

        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }
    }

}