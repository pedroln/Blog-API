import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Injectable()
  export class ApiKeyGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const apiKey = request.headers['x-api-key']; 
  
      if (!apiKey) {
        throw new UnauthorizedException('x-api-key header missing');
      }
  
      if (apiKey !== process.env.API_KEY) {
        throw new HttpException({error: 'x-api-key header missing'}, HttpStatus.FORBIDDEN)
      
      }
  
      return true;
    }
  }