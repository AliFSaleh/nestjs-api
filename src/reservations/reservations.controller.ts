import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { createReservationDto } from './dto/reservations.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnumType } from 'src/users/entity/users.entity';

@Controller('api/reservations')
export class ReservationsController {
    constructor (
        private reservationsService: ReservationsService
    ) {}

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.USER)
    @Get('/')
    findReservations(
        @Req() req
    ){
        return this.reservationsService.findReservations(req.user.sub)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.USER)
    @Post('/')
    createReservation(
        @Body() data: createReservationDto,
        @Req() req
    ) {
        return this.reservationsService.createReservation(data, req.user.sub)
    }
}
