import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { User } from "@prisma/client";

export interface Repository{
    create(data: CreateUserDTO): Promise<User>;
    get(userId: string): Promise<User | null>;
    getAll(): Promise<User[] | null>;
    delete(): Promise<any>;
    update(): Promise<any>;
}