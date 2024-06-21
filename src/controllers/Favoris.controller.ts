import express, { Response, Request, NextFunction } from "express";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import NatsService from "../nats";
import { AuthenticatedRequest } from "../interface/decode.interface";


export class FavorisController {


    command: string;


    constructor(command: string) {
        this.command = command;
    }


    async addMovieFavoris(req: AuthenticatedRequest, res: Response, next: NextFunction)
    :Promise<ResponseSuccessInterface | ResponseErrorInterface>
    {
        console.log("voici le req.headers.userId", req.userId);
        console.log("voici le req.headers.userRole", req.roleUser);
    
        console.log("params", req.params);
        try {
            const nats = new NatsService()
            const userRole = req.roleUser;
        if(userRole === 'USER' || userRole === 'ADMIN') {
            console.log('he is admin or user !');

            const data = {
                userId: req.userId,
                movieId: req.params
            }
            
            const movie = await nats.send("ADD_MOVIE_FAVORIS", data)

            return { results: movie, error: false, message: "Movie added favorite", status: 200, date: new Date() }

        } else {
            console.log('he isn\'t admin or user !');

            return { error: true, message: "Unauthorized Access", status: 401 }

        }


        } catch (error) {
            return { error: true, message: error.message, status: 500 }

        }  
    }

}