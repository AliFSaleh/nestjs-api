import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { loginDto } from './dto';
import { CreateUserDto } from 'src/users/dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('signup')
    signup(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Post('login')
    login(@Body() dto: loginDto) {
        return this.authService.login(dto)
    }
}
