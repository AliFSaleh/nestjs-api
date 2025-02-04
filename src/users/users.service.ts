import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt'
import { loginDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOne (data: loginDto) {
        const user = await this.userRepository.findOneBy({ email: data.email })
        if(!user)
            throw new UnauthorizedException('User not found')
        
        return user
    }

    async findMe(id) {
        const user = await this.userRepository.findOneBy({id})
        if(!user)
            throw new UnauthorizedException('User not found')

        return user
    }

    async findUsers(q, role) {
        const options: FindManyOptions<User> = {};
        if(q)
            options.where = {name: Like(`%${q}%`)}
        if(role)
            options.where = {...options.where, role: role}

        const users = await this.userRepository.find(options)
        return users
    }

    async createUser (data: CreateUserDto) {
        data.password = await bcrypt.hash(data.password, 12) 
        const user = await this.userRepository.save(data)

        return user
    }

    async updateUser (userId: number, data: Partial<User>) {
        return await this.userRepository.update(userId, data)
    }

    async deleteUser(userId) {
        return await this.userRepository.delete(userId)
    }
}
