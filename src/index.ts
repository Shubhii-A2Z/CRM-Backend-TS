import express from 'express';

import { genericErrorHandler } from './middlewares/error.middleware';
import serverConfig from './config/server.config';
import logger from './config/logger.config';
import apiRouter from './routers';
import cookieParser from 'cookie-parser';

const app=express();

app.use(express.json());

app.use(cookieParser());
app.use('/api',apiRouter);

/**
 * Adding the error handler middleware: this will replace the default error handler middlware
 */
app.use(genericErrorHandler);


app.listen(serverConfig.PORT,async()=>{
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    logger.info('Server Started',{success: true}); // Logging with Metadata
});