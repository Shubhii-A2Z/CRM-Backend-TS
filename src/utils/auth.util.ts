import jwt from 'jsonwebtoken';
import serverConfig from '@/config/server.config';

export class JWTAuth{
    generateJWtToken(obj: any): string{
        return jwt.sign(obj, serverConfig.AUTH_SECRET, {expiresIn:'8h'});
    }
}