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
import { JWTSignIn } from '@/services/jwt.signin';
import { SignInStrategy } from '@/services/signin.strategy';

const userRouter = express.Router();

const userRepository: Repository=new UserRepository();
const userService: Service=new UserService(userRepository);

const userSignIn: SignInStrategy=new JWTSignIn(userRepository);
const userController: UserController=new UserController(userService, userSignIn);

const jwtAuth: AuthStrategy=new JWTAuth();

userRouter.get('/:id',jwtAuth.isLoggedIn,userController.getUser);
userRouter.get('/',userController.getAllUsers);
userRouter.post('/signup',validateRequestBody(createUserSchema),userController.createUser);
userRouter.post('/signin',validateRequestBody(signInSchema),userController.signIn);

export default userRouter;