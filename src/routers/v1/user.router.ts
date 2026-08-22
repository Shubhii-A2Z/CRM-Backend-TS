import { UserController } from '@/controllers/user.controller';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import express from 'express';

const userRouter = express.Router();

const userRepository=new UserRepository();
const userService=new UserService(userRepository);
const userController=new UserController(userService);

userRouter.get('/:id',userController.getUser);
userRouter.get('/',userController.getAllUsers);

export default userRouter;