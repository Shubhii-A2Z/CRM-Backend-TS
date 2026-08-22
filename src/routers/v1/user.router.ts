import { UserController } from '@/controllers/user.controller';
import { validateRequestBody } from '@/middlewares/validate.middleware';
import { createUserSchema } from '@/models/zod.schema';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import express from 'express';

const userRouter = express.Router();

const userRepository=new UserRepository();
const userService=new UserService(userRepository);
const userController=new UserController(userService);

userRouter.get('/:id',userController.getUser);
userRouter.get('/',userController.getAllUsers);
userRouter.post('/',validateRequestBody(createUserSchema),userController.createUser);

export default userRouter;