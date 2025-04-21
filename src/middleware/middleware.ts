import { NextFunction, Request, Response } from "express"
import { validateToken } from "../utils/jwt"

export const checkAuth = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const authToken = req.headers.authorization;
        const convertToken:string = authToken?.split(" ")[1] || "";
      
        const decoded = validateToken(convertToken)
        next()
    } catch(error){

    }

}