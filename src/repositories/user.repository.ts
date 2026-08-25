import { prismaClient } from "@/prisma/client";
import { UserRepository } from "./user.repository.interface";
import { User } from "@prisma/client";
import { CreateUserDTO } from "@/dtos/CreateUserDTO";

export class UserRepositoryImpl implements UserRepository {

    async create(data: CreateUserDTO): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password
            }
        });
        return user;
    }

    async get(userId: string): Promise<User | null> {
        const user: User | null = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;
    }

    async getAll(): Promise<User[] | null> {
        const users: User[] | null = await prismaClient.user.findMany({
            where: {}
        });
        return users;
    }

    async delete() {

    }

    async updatePassword(email: string, hash: string): Promise<User | null> {
        const user: User = await prismaClient.user.update({
            where: {
                email: email
            },
            data: {
                password: hash
            }
        });
        return user;
    }

    async getUserByEmail(userEmail: string): Promise<User | null> {
        const user: User | null = await prismaClient.user.findUnique({
            where: {
                email: userEmail
            }
        });
        return user;
    }

    async getUserByToken(token: string, hash: string): Promise<User | null> {
        const user: User | null = await prismaClient.user.findUnique({
            where: {
                resetPasswordToken: token
            }
        });

        if(!user?.resetPasswordExpires || user.resetPasswordExpires < new Date()){
            return null;
        }

        const response: User|null = await prismaClient.user.update({
            where:{
                resetPasswordToken: token
            },
            data:{
                password: hash
            }
        });

        return response;
    }

    async resetPassword(email: string, token: string): Promise<User | null> {
        const user: User = await prismaClient.user.update({
            where:{
                email:email
            },
            data:{
                resetPasswordToken: token,
                resetPasswordExpires: new Date(Date.now()+10*60*1000)
            }
        });
        return user;
    }
        
}