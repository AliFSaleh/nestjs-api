import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HostRequest, StatusEnumType } from './entity/host_requests.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RoleEnumType, User } from 'src/users/entity/users.entity';

@Injectable()
export class HostRequestsService {
    constructor (
        private userService: UsersService,

        @InjectRepository(HostRequest)
        private hostRequestRepository: Repository<HostRequest>
    ) {}

    async findRequests(userId, status) {
        const options: FindManyOptions = {}
        if(userId)
            options.where = {user: {id: userId}}
        if(status)
            options.where = {...options.where, status: status}

        options.relations = ['user']        

        const requests = await this.hostRequestRepository.find(options)
        return requests
    }
    
    async createRequest(userId: number, file) {
        const oldRequest = await this.hostRequestRepository.count({
            where: {
                user: {id: userId},
                status: StatusEnumType.PENDING,
            }
        })
        if(oldRequest > 0)
            throw new BadRequestException('Your previous request is being processed')

        const user = await this.userService.findMe(userId)
        const userRole = user.role as string
        if(userRole === RoleEnumType.HOST)
            throw new BadRequestException('Your account type is host already')

        const newRequest = new HostRequest()
        newRequest.user = user
        newRequest.file = file.path
        return await this.hostRequestRepository.save(newRequest)
    }

    async confirmRequest(hostRequestID: number) {
        const host_request = await this.hostRequestRepository.findOne({
            where: {id: hostRequestID},
            relations: ['user']
        })
        if(!host_request)
            throw new ForbiddenException('Request not found')
        if(host_request.status != StatusEnumType.PENDING)
            throw new ForbiddenException('This request has already been processed')

        host_request.status = StatusEnumType.CONFIRMED
        const user = host_request.user
        user.role = RoleEnumType.HOST
        await this.userService.updateUser(user.id, user)

        return await this.hostRequestRepository.save(host_request) 
    }

    async rejectRequest(hostRequestID: number) {
        const host_request = await this.hostRequestRepository.findOneBy({id: hostRequestID})
        if(!host_request)
            throw new ForbiddenException('Request not found')
        if(host_request.status != StatusEnumType.PENDING)
            throw new ForbiddenException('This request has already been processed')

        host_request.status = StatusEnumType.REJECTED

        return await this.hostRequestRepository.save(host_request) 
    }
}