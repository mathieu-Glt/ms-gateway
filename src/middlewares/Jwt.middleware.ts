import express, { Response, Request, NextFunction } from "express";
import { ResponseErrorInterface, ResponseSuccessInterface } from "../interface/response.interface";
import { AuthenticatedRequest } from '../interface/decode.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const JwtMiddlewareAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    console.log("JWT Middleware invoked ~ JwtMiddlewareAuth");
    console.log("req.headers ~ JwtMiddlewareAuth", req.headers);
    
    try {
        const accessToken = process.env.JWT_SECRET;
        console.log("JWT_SECRET ~ JwtMiddlewareAuth : ", accessToken);

        const tokenHeader = req.headers['x-access-token'];
        const token: string | undefined = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
        console.log("TOKEN ~ JwtMiddlewareAuth : ", token);
        
            // const jeton: string | string[] | undefined = token?.split(" ")[1]
            // console.log("JETON : ", jeton);
    


        if(!token) {
            res.status(401).json({ message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' });
            return;        
        } else {
            
            // if(accessToken) {
                let decode: JwtPayload | string
                try {
                    decode = jwt.verify(token, accessToken)
                    console.log("DECODE : ~ JwtMiddlewareAuth", decode);
                    if(typeof decode === 'object' && 'sub' in decode) {
                        const subValueBracket = decode['sub']
                        // const subValueBracket = decode.sub
                        console.log("subValueBracket value of sub ~ JwtMiddlewareAuth : ", subValueBracket);
                        
                        // req.userId = decode.sub
                        req.userId = subValueBracket
                        req.headers['x-gate-user'] = JSON.stringify(decode)
                        console.log("voici le req.headers ~ JwtMiddlewareAuth", req.headers['x-gate-user']);
                        console.log("voici le req.headers.userId ~ JwtMiddlewareAuth", req.userId);
            
                    }
    
                } catch (error) {
                    console.error('JWT verification error:', error);
                    res.status(401).json({ message: 'Unauthorized - Invalid JsonWebToken', code: 'NJTW-G-02' });
                    return;
        
                }
    
    
            // } else {
            //     res.status(401).json({ message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' });

            // }
            console.log("voici le req.headers ~ JwtMiddlewareAuth", req.headers['x-gate-user']);
            console.log("voici le req.headers.userId ~ JwtMiddlewareAuth", req.userId);

            next();

        }

    } catch (error) {
        res.status(500).json({ message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' });

    }
}