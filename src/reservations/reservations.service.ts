import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
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

    async findReservations(user_id: number) {
        return await this.reservationRepository.find({
            where: {
                user: {id: user_id}
            }
        })
    }

    async createReservation (data: createReservationDto, user_id: number) {
        const real_estate = await this.realEstateService.findRealEstate(data.real_estate_id)
        if(!real_estate)
            throw new BadRequestException('Real state not found')

        const status = await this.possibilityCheck(data)
        if(!status)
            throw new BadRequestException('Cannot reservation right now,the real estate is reserved!')
        
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

        return this.reservationRepository.save({
            user,
            real_estate,
            cost,
            start_date: data.start_date,
            end_date: data.end_date
        })
    }

    
    possibilityCheck = async (data: createReservationDto) => {
        let status = true

        const real_estate_reservations =await this.reservationRepository.find({
            order: {
                start_date: "ASC"
            }
        })

        const previous_reservation = await this.reservationRepository.findOne({
            order: {
                start_date: "DESC"
            },
            where: {
                start_date: LessThan(data.start_date)
            }
        })

        const subsequent_reservation = await this.reservationRepository.findOne({
            order: {
                start_date: "ASC"
            },
            where: {
                start_date: MoreThan(data.start_date)
            }
        })

        if(!real_estate_reservations){
            status = true
        } else if (real_estate_reservations.length == 1) {
            if(data.start_date > real_estate_reservations[0].end_date || data.end_date < real_estate_reservations[0].start_date)
                status = true
            else
                status = false
        } else if (real_estate_reservations.length > 1) {
            if(data.end_date > subsequent_reservation.start_date || data.start_date < previous_reservation.end_date)
                status = false
        }

        return status
    }
}
