import { prismaClient } from "@/prisma/client";
import { Repository } from "./repository.interface";
import { User } from "@prisma/client";
import { CreateUserDTO } from "@/dtos/CreateUserDTO";

export class UserRepository implements Repository{

    async create(data: CreateUserDTO): Promise<User> {
        const user=await prismaClient.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password
            }
        });
        return user;
    }

    async get(userId: string): Promise<User | null> {
        const user: User | null =await prismaClient.user.findUnique({
            where:{
                id: userId
            }
        });
        return user;
    }

    async getAll(): Promise<User[] | null> {
        const users: User[] | null =await prismaClient.user.findMany({
            where: {}
        });
        return users;
    }

    async delete() {
        
    }

    async update() {
        
    }
}