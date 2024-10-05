import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from '@nestjs/jwt';

function mapMessage(info: JsonWebTokenError): string {
    if (info.message.includes('malformed')) {
      return `token ผิด format`
    }
  
    if (info.message.includes('expired')) {
      return `token หมดอายุ`
    }
  
    return info.message
  }
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
          console.log('err', err)
          console.log('info', info)
          throw new UnauthorizedException(mapMessage(info));
        }
        return user;
      }
}
