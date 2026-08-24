import { UserController } from '@/controllers/user.controller';
import { JWTAuth } from '@/middlewares/validators/jwt.auth.middleware';
import { validateRequestBody } from '@/middlewares/validate.middleware';
import { createUserSchema, signInSchema } from '@/models/zod.schema';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import express from 'express';
import { AuthStrategy } from '@/middlewares/validators/auth.strategy';
import { Repository } from '@/repositories/repository.interface';
import { Service } from '@/services/service.interface';
import { JWTSignIn } from '@/services/signInService/jwt.signin';
import { SignInStrategy } from '@/services/signInService/signin.strategy';
import { MailingStrategy } from '@/services/mailingService/mailer.strategy.interface';
import { SendGrid } from '@/services/mailingService/sendGrid.strategy';

const userRouter = express.Router();

// Initializing the mailing service strategy
const mailerService: MailingStrategy=new SendGrid();

//Initializing the repository
const userRepository: Repository = new UserRepository();

// Initializing the service strategy
const userService: Service = new UserService(userRepository, mailerService);

// Initializing the user sign in strategy
const userSignIn: SignInStrategy = new JWTSignIn(userRepository);

// Initializing the user controller
const userController: UserController = new UserController(userService, userSignIn);

const jwtAuth: AuthStrategy = new JWTAuth();

userRouter.get('/:id', jwtAuth.isLoggedIn, userController.getUser);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/signup', validateRequestBody(createUserSchema), userController.createUser);
userRouter.post('/signin', validateRequestBody(signInSchema), userController.signIn);

export default userRouter;