import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
 
  constructor(private jwtService:JwtService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
     const request = context.switchToHttp().getRequest();
    
     const token = this.extractTokenFromHeader(request)

     console.log(request.headers)

     if(!token) {
       throw new UnauthorizedException("Unautorized to access this route")
     }


     

     const payload = await this.jwtService.verifyAsync(token,{
      secret:jwtConstants.secret
     })

     

     request['user'] = payload

     return true
  }


  private extractTokenFromHeader(request:Request):string | undefined {
    const [type,token] = request.headers.authorization?.split(' ') ?? []

    return  type === "Bearer" ? token : undefined
  }
}
