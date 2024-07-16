import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservations.entity';
import { UsersModule } from 'src/users/users.module';
import { RealEstatesModule } from 'src/real-estate/real-estates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UsersModule, RealEstatesModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [TypeOrmModule]
})
export class ReservationsModule {}
