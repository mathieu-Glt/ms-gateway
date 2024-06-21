import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from '../interface/decode.interface';
import NatsService from "../nats";


export const checkRoleUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("voici le req.headers.userId ~ checkRoles", req.userId);
        const id = req.userId;
        // console.log("voici le role ~ checkRoles", id);

        const nats = new NatsService();
        const userDetails = await nats.send("GET_USER_BY_ID_ROLE", id); // Ajoutez "await" ici
        console.log("voici le userDetails ~ checkRoles", userDetails);

        
        if (userDetails) {
            // Traitez les détails de l'utilisateur ici
            console.log("user verified !!");
            
            console.log("userDetails ~ checkRoleUser : ", userDetails);
            const role = userDetails.results.role

            console.log("userDetails ~ checkRoleUser - role : ", role);

            req.roleUser = role



        }
        
        next(); // Assurez-vous d'appeler next() pour passer au middleware suivant ou à la route correspondante
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-02' });
    }
}
