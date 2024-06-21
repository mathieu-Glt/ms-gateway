import { User } from "../entities/User.entity";



// class ResponseInterface {
//     results?:  User;
//     error?: boolean;
//     message: string;
//     status: number;
//     date: Date;
//   }
  
  
//   export class ResponseSuccessInterface extends ResponseInterface {
//     results: User;
//   }
    
//   export class ResponseErrorInterface extends ResponseInterface {
//     error: boolean;
//   }

export interface ResponseInterface {
    results:  User | User[];
    error: boolean;
    message: string;
    status: number;
    date: Date;

}

export type ResponseSuccessInterface = Omit<ResponseInterface, "error">
export type ResponseErrorInterface = Pick<ResponseInterface, "error" | "message" | "status">

