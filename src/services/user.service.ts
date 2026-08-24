import bcrypt from 'bcrypt';

import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { Repository } from "@/repositories/repository.interface";
import { User } from "@prisma/client";
import { Service } from './service.interface';
import { MailingStrategy } from './mailingService/mailer.strategy.interface';
import { Mailer } from './mailingService/mailer';

export class UserService implements Service{

    private repository: Repository;
    private mailer: MailingStrategy;

    constructor(repository: Repository, mailer: MailingStrategy){
        this.repository=repository;
        this.mailer=mailer;
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

        /*
            Here we don't await for the email to be sent because we don't want to
            block the user registration process on the email sending.
            This is a best practice in production level applications.
        */
        this.mailer.sendEmail(data.email, "Account Created Successfully", Mailer.signInEmail(data.name));

        return user;
    }

}