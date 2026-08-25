import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/errors/app.error";

// This generic error handler will only handle errors which are of type AppError, else default error handler will be called
export function genericErrorHandler(err: AppError,_: Request,resp: Response,next: NextFunction){
    const statusCode = err.statusCode || 500;
    // Defining error response format instead of default html format
    resp.status(statusCode).json({
        success: false,
        message: err.message,
    });
    next();
}