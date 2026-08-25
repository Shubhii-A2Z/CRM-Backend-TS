import { UserService } from "@/services/service.interface";
import { SignInStrategy } from "@/services/signInService/signin.strategy";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserController {
    private userService: UserService;
    private userSignIn: SignInStrategy;

    constructor(userService: UserService, userSignIn: SignInStrategy) {
        this.userService = userService;
        this.userSignIn = userSignIn;
    }

    getUser = async (req: Request, resp: Response) => {
        const userId = (req as any).user.id;

        if (!userId || typeof userId != 'string') {
            return resp.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid or missing user id"
            });
        }

        const user = await this.userService.get(userId);

        if (!user) {
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

    getAllUsers = async (_: Request, resp: Response) => {

        const response = await this.userService.getAll();

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "All Users fetched successfully",
            data: response,
            error: {}
        });
    }

    createUser = async (req: Request, resp: Response) => {
        const response = await this.userService.create(req.body);

        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created successfully",
            data: response,
            error: {}
        });
    }

    signIn = async (req: Request, resp: Response) => {
        const response = await this.userSignIn.signIn(req.body);

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "User signed in successfully",
            JWT_Token: response,
            error: {}
        });
    }


    forgetPassword = async (req: Request, resp: Response) => {
        await this.userService.getByEmail(req.body.email);
        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "Reset Password Link Sent Successfully"
        });
    }

    resetPassword = async (req: Request, resp: Response) => {
        const resetToken=req.params.token;

        if (!resetToken || typeof resetToken != 'string') {
            return resp.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid or missing reset token"
            });
        }

        const response=await this.userService.resetPassword(resetToken,req.body);

        return resp.status(StatusCodes.OK).json({
            Response: response
        });
        
    }

}