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
}