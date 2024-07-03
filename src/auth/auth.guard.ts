import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleEnumType } from 'src/users/entity/users.entity';
import { ROLES_KEY } from './decorators/roles.decorator';
import * as dotenv from 'dotenv';
dotenv.config();


  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private readonly reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }

      const requiredRoles = this.reflector.getAllAndOverride<RoleEnumType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);      
      if (!requiredRoles)
        return true;

      if(!requiredRoles.includes(request.user.role))
        throw new UnauthorizedException();
      
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }