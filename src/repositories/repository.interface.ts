import { User } from "@prisma/client";

export interface Repository{
    create(data: any): Promise<any>;
    get(userId: string): Promise<User | null>;
    getAll(): Promise<User[] | null>;
    delete(): Promise<any>;
    update(): Promise<any>;
}