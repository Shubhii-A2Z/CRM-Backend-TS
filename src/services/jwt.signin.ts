import { SignInDTO } from "@/dtos/SignInDTO";
import { SignInStrategy } from "./signin.strategy";
import { NotFoundError, UnauthorizedAccess } from "@/utils/errors/app.error";
import bcrypt from "bcrypt";
import { JWTToken } from "@/utils/auth.util";
import { Repository } from "@/repositories/repository.interface";

export class JWTSignIn implements SignInStrategy{
    
    constructor(private repository: Repository){
        this.repository=repository;
    }

    async signIn(data: SignInDTO): Promise<string>{
        const user=await this.repository.getUserByEmail(data.email);
        if(!user){
            throw new NotFoundError("User not found");
        }

        const isPasswordValid=bcrypt.compareSync(data.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedAccess("Invalid Password");
        }

        const jwt=new JWTToken().generateJWtToken({
            id: user.id,
            email: user.email,
            role: user.roles
        });

        return jwt;
    }
}