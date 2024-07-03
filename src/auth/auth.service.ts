import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(data: loginDto) {
        const user = await this.userService.findOne(data)

        const comparePassword = bcrypt.compare(data.password, user.password)
        if(!comparePassword)
            throw new UnauthorizedException('Password not match')

        const payload = {sub: user.id, email: user.email, role: user.role}
        const access_token = await this.jwtService.signAsync(payload)

        return {
            access_token
        }
    }
}
