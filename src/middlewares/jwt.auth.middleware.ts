import { JWTToken } from "@/utils/auth.util";
import { UnauthorizedAccess } from "@/utils/errors/app.error";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class JWTAuth{
    isLoggedIn(req: Request, resp: Response, next: NextFunction){
        // Extracting the jwt token from request headers
        const token=req.headers.authorization?.split(' ')[1]; // Token will be of the form: Bearer <token>

        if(!token){
            return resp.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Not Allowed to perform the operation",
                err: new UnauthorizedAccess('Not Allowed to perform the operation'),
            })
        }

        try {
            // verifying jwt token
            const decodedPayload=new JWTToken().verifyToken(token);
            
            // attaching the decoded payload to the request
            (req as any).user=decodedPayload;
            
            next();
        } catch (error) {
            return resp.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid JWT Token",
                err: new UnauthorizedAccess('Invalid JWT Token'),
            });
        }

    }
}