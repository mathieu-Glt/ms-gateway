import express, { Response, Request, NextFunction } from "express";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import { AuthenticatedRequest } from '../interface/decode.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const JwtRefreshToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    console.log("JWT Middleware invoked ~ JwtRefreshToken");
    console.log("req.headers ~ JwtMiddlewareAuth", req.headers);


    try {
        const refresh_token_secret = process.env.JWT_REFRESH_SECRET;
        console.log("JWT_SECRET ~ JwtRefreshToken : ", refresh_token_secret);
        const authHeader = req.headers['authorization'];
        console.log("JWT_SECRET ~ JwtRefreshToken : ", authHeader);

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract the token part
            const token = authHeader.split(' ')[1];

    
            // Use the token as needed
            console.log('Extracted Token:', token);

            let decode: JwtPayload | string

                decode = jwt.verify(token, refresh_token_secret)
                console.log("DECODE : ~ JwtRefreshToken", decode);

                req.headers['x-gate-user'] = JSON.stringify(decode)


    
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }


        console.log("voici le req.headers ~ JwtRefreshToken", req.headers['x-gate-user']);

    } catch (error) {
        res.status(500).json({ message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' });
 
    }
    next();
}