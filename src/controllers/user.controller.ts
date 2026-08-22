import { UserService } from "@/services/user.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserController{
    private userService: UserService;

    constructor(userService: UserService){
        this.userService=userService;
    }

    getUser = async(req: Request, resp: Response) => {
        const userId=req.params.id;

        if(!userId || typeof userId!='string'){
            return resp.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid or missing user id"
            });
        }

        const response=await this.userService.get(userId);

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "User fetched successfully",
            data: response,
            error: {}
        });
    }

    getAllUsers = async(_: Request, resp: Response) => {

        const response=await this.userService.getAll();

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "All Users fetched successfully",
            data: response,
            error: {}
        });
    }

    createUser = async (req: Request, resp: Response) => {
        const response=await this.userService.create(req.body);

        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created succesfully",
            data: response,
            error: {}
        });
    }
}