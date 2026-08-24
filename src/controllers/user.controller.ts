import { Service } from "@/services/service.interface";
import { SignInStrategy } from "@/services/signin.strategy";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserController{
    private userService: Service;
    private userSignIn: SignInStrategy;

    constructor(userService: Service, userSignIn: SignInStrategy){
        this.userService=userService;
        this.userSignIn=userSignIn;
    }

    getUser = async(req: Request, resp: Response) => {
        const userId=(req as any).user.id;

        if(!userId || typeof userId!='string'){
            return resp.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid or missing user id"
            });
        }

        const user=await this.userService.get(userId);

        if(!user){
            return resp.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User with id not found"
            });
        }

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "User fetched successfully",
            data: user,
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
            message: "User created successfully",
            data: response,
            error: {}
        });
    }

    signIn = async(req: Request,resp: Response)=>{
        const response=await this.userSignIn.signIn(req.body);

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "User signed in successfully",
            JWT_Token: response,
            error: {}
        });
    }

    
}