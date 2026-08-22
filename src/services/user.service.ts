import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { Repository } from "@/repositories/repository.interface";
import { User } from "@prisma/client";

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
        const user=await this.repository.create(data);
        return user;
    }
}