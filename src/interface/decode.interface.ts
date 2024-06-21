import { Request } from "express";

// Déclarez une interface pour étendre Request avec le champ userId
export interface AuthenticatedRequest extends Request {
    userId?: string;
    roleUser?: string
}