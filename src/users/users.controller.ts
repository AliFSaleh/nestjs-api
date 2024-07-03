import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard'; 

@Controller('api/users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('me')
    findMe(@Request() req) {
        return this.userService.findMe(req.user.sub)
    }
}
