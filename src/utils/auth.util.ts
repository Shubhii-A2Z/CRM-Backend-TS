import jwt, { JwtPayload } from 'jsonwebtoken';
import serverConfig from '@/config/server.config';

export class JWTToken{
    generateJWtToken(obj: any): string{
        return jwt.sign(obj, serverConfig.AUTH_SECRET, {expiresIn:'8h'});
    }

    verifyToken(token: string): string | JwtPayload{
        return jwt.verify(token, serverConfig.AUTH_SECRET)
    }
}