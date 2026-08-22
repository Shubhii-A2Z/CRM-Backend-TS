import express from 'express';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import { prismaClient } from './prisma/client';

const app=express();

app.use(express.json());

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);

app.listen(serverConfig.PORT,async()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    const user=await prismaClient.user.create({
        data:{
            name: "prisma",
            email: "hello@prisma",
            password: "12345"
        }
    });
    console.log(user);
    logger.info('Server Started',{success: true}); // Logging with Metadata
});