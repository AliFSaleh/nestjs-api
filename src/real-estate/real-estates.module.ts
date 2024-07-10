import { Module } from '@nestjs/common';
import { RealEstatesController } from './real-estates.controller';
import { RealEstatesService } from './real-estates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstate } from './entity/real-estates.entity';
import { UsersModule } from 'src/users/users.module';
import { Image } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstate, Image]), UsersModule],
  controllers: [RealEstatesController],
  providers: [RealEstatesService]
})
export class RealEstatesModule {}
