import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entity/reservations.entity';
import { createReservationDto } from './dto/reservations.dto';
import { RealEstatesService } from 'src/real-estate/real-estates.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReservationsService {
    constructor (
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,

        private realEstateService: RealEstatesService,

        private userService: UsersService,
    ) {}

    async createReservation (data: createReservationDto, user_id: number) {
        const real_estate = await this.realEstateService.findRealEstate(data.real_estate_id)
        if(!real_estate)
            throw new BadRequestException('Real state not found')
        const user = await this.userService.findMe(user_id)

        if(data.start_date > data.end_date)
            throw new BadRequestException('The end date for reservation should be after the start date')

        const differenceInMs = new Date(data.end_date).getTime() - new Date(data.start_date).getTime();
        const reservation_days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

        let price_per_day: number
        if(reservation_days < 7){
            price_per_day = real_estate.price_per_day
        } else if (reservation_days <30) {
            price_per_day = real_estate.price_per_week/7
        } else {
            price_per_day = real_estate.price_per_month/30
        }
        const cost = price_per_day * reservation_days

        return this.reservationRepository.create({
            user,
            real_estate,
            cost,
            start_date: data.start_date,
            end_date: data.end_date
        })
    }
}
