import { NextFunction, Request, Response } from "express";

export interface AuthStrategy{
    isLoggedIn(req: Request, resp: Response, next: NextFunction): void;
}