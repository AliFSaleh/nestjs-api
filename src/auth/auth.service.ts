import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
    ) {}

    async login(data: loginDto) {
        const user = await this.userService.findOne(data)

        const comparePassword = bcrypt.compare(data.password, user.password)
        if(!comparePassword)
            throw new UnauthorizedException('Password not match')

        return {
            user
        }
    }
}
