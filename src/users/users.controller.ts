import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard'; 
import { RoleEnumType } from './entity/users.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('api/users')
export class UsersController {
    constructor (private userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('me')
    findMe(@Request() req) {        
        return this.userService.findMe(req.user.sub)
    }

    @Roles(RoleEnumType.ADMIN)
    @UseGuards(AuthGuard)
    @Get('/')
    findUsers(
        @Query('q') q?: string, 
        @Query('role') role?: RoleEnumType
    ) {
        return this.userService.findUsers(q, role)
    }

    @Roles(RoleEnumType.ADMIN)
    @UseGuards(AuthGuard)
    @Post('/')
    createUser(
        @Body() data: CreateUserDto 
    ) {
        return this.userService.createUser(data)
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    getUser(
        @Param('userId') userId: number
    ) {
        return this.userService.findMe(userId)
    }

    @Roles(RoleEnumType.ADMIN)
    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser (
        @Param('id') userId: number,
        @Body() data: UpdateUserDto
    ) {
        return this.userService.updateUser(userId, data)
    }

    @Roles(RoleEnumType.ADMIN)
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser (
        @Param('id') userId: number
        ) {
        return this.userService.deleteUser(userId)
    }
}
