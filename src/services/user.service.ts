import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

import { CreateUserDTO } from "@/dtos/CreateUserDTO";
import { User } from "@prisma/client";
import { UserService } from './service.interface';
import { MailingStrategy } from './mailingService/mailer.strategy.interface';
import { Mailer } from './mailingService/mailer';
import { serverConfig } from '@/config/server.config';
import { UserRepository } from '@/repositories/user.repository.interface';
import logger from '@/config/logger.config';
import { ResetPasswordDTO } from '@/dtos/ResetPasswordDTO';

export class UserServiceImpl implements UserService {

    private repository: UserRepository;
    private mailer: MailingStrategy;

    constructor(repository: UserRepository, mailer: MailingStrategy) {
        this.repository = repository;
        this.mailer = mailer;
    }

    async get(userId: string): Promise<User | null> {
        return await this.repository.get(userId);
    }

    async getAll(): Promise<User[] | null> {
        return await this.repository.getAll();
    }

    async create(data: CreateUserDTO): Promise<User> {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        const user = await this.repository.create(data);

        /*
            Here we don't await for the email to be sent because we don't want to
            block the user registration process on the email sending.
            This is a best practice in production level applications.
        */
        this.mailer.sendEmail(data.email, "Account Created Successfully", Mailer.signInEmail(data.name));

        return user;
    }

    async getByEmail(email: string): Promise<boolean> {
        const user = await this.repository.getUserByEmail(email);
        if (!user) return false;

        const resetToken = crypto.randomBytes(32).toString("hex");
        await this.repository.resetPassword(email,resetToken);

        const frontendUrl = serverConfig.FRONTEND_URL || 'localhost:3000';
        const resetLink = `${frontendUrl}/reset-password/${resetToken}`;

        this.mailer.sendEmail(email, "Reset Password", Mailer.resetPasswordLinkEmail(resetLink));
        logger.info("Reset password link sent to the user", {
            email: email,
            resetLink: resetLink
        });

        return true;
    }

    async resetPassword(token: string, data: ResetPasswordDTO): Promise<any> {
        const salt = bcrypt.genSaltSync(10);
        data.newPassword = bcrypt.hashSync(data.newPassword, salt);

        const response=await this.repository.getUserByToken(token, data.newPassword);
        return response;
    }

}