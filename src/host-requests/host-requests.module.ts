import { Module } from '@nestjs/common';
import { HostRequestsController } from './host-requests.controller';
import { HostRequestsService } from './host-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostRequest } from './entity/host-requests.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HostRequest]), UsersModule],
  controllers: [HostRequestsController],
  providers: [HostRequestsService],
  exports: [TypeOrmModule]
})
export class HostRequestsModule {}
