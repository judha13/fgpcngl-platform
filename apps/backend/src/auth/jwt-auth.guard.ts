import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Handle token expiration
        if (info?.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token is expired, login again');
        }

        // Handle invalid token
        if (info?.name === 'JsonWebTokenError') {
            throw new UnauthorizedException('Invalid token');
        }

        // Handle other errors
        if (err || !user) {
            throw err || new UnauthorizedException('Unauthorized access');
        }

        return user;
    }
}
