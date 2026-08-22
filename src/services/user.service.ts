import bcrypt from 'bcrypt';

import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { Repository } from "@/repositories/repository.interface";
import { User } from "@prisma/client";
import { SignInDTO } from '@/dtos/SignInDTO';
import { NotFoundError, UnauthorizedAccess } from '@/utils/errors/app.error';
import { JWTAuth } from '@/utils/auth.util';

export class UserService{

    private repository: Repository;

    constructor(repository: Repository){
        this.repository=repository;
    }

    async get(userId: string): Promise<User | null>{
        return await this.repository.get(userId);
    }

    async getAll(): Promise<User[] | null>{
        return await this.repository.getAll();
    }

    async create(data: CreateUserDTO): Promise<User>{
        const salt=bcrypt.genSaltSync(10);
        data.password=bcrypt.hashSync(data.password,salt);
        
        const user=await this.repository.create(data);
        return user;
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

        const jwt=new JWTAuth().generateJWtToken({
            id: user.id,
            email: user.email,
            role: user.roles
        });

        return jwt;
    }
}