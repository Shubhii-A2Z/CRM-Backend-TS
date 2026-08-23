import { UserController } from '@/controllers/user.controller';
import { JWTAuth } from '@/middlewares/jwt.auth.middleware';
import { validateRequestBody } from '@/middlewares/validate.middleware';
import { createUserSchema, signInSchema } from '@/models/zod.schema';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import express from 'express';

const userRouter = express.Router();

const userRepository=new UserRepository();
const userService=new UserService(userRepository);
const userController=new UserController(userService);

const jwtAuth=new JWTAuth();

userRouter.get('/:id',jwtAuth.isLoggedIn,userController.getUser);
userRouter.get('/',userController.getAllUsers);
userRouter.post('/signup',validateRequestBody(createUserSchema),userController.createUser);
userRouter.post('/signin',validateRequestBody(signInSchema),userController.signIn);

export default userRouter;