import bcrypt from 'bcrypt';

import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { Repository } from "@/repositories/repository.interface";
import { User } from "@prisma/client";
import { Service } from './service.interface';

export class UserService implements Service{

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

}