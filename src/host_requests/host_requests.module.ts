import { Module } from '@nestjs/common';
import { HostRequestsController } from './host_requests.controller';
import { HostRequestsService } from './host_requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostRequest } from './entity/host_requests.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HostRequest]), UsersModule],
  controllers: [HostRequestsController],
  providers: [HostRequestsService],
  exports: [TypeOrmModule]
})
export class HostRequestsModule {}
