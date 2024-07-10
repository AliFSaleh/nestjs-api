import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealEstate } from './entity/real-estates.entity';
import { Repository } from 'typeorm';
import { CreateRealEstateDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { Image } from './entity/images.entity';

@Injectable()
export class RealEstatesService {
    constructor (
        @InjectRepository(RealEstate)
        private realEstateRepository: Repository<RealEstate>,
        
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,

        private usersService: UsersService
    ) {}

    async findRealEstates () {
        return await this.realEstateRepository.find({
            relations: ['user']
        })
    }

    async createRealEstate (userId, images, data: CreateRealEstateDto) {
        data.user = userId
        data.main_image = images.main_image[0].path
        const created_real_estate = await this.realEstateRepository.save(data)

        for (const file of images.files) {
            const image = new Image()
            
            image.filename = file.filename
            image.path = file.path
            image.real_estate = created_real_estate            
            
            await this.imageRepository.save(image)
        }

        return created_real_estate
    }

    async findRealEstate (realEstateId: number) {
        return await this.realEstateRepository.findOne({
            where: { id: realEstateId },
            relations: ['category', 'user', 'images']
        })
    }

    async updateRealEstate (userId: number, realEstateId: number, data, images) {
        const realEstate = await this.realEstateRepository.findOne({
            where: { id: realEstateId },
            relations: ['user']
        })
        if(realEstate.user.id != userId)
            throw new UnauthorizedException()        

        return await this.realEstateRepository.update(realEstateId, data)
    }

    async deleteRealEstate (realEstateId: number) {
        const realEstate = await this.realEstateRepository.findOne({ where: {id: realEstateId}, relations: ['images'] });
        if (realEstate)
            await this.imageRepository.delete({ real_estate: realEstate });

        return await this.realEstateRepository.delete(realEstateId)
    }
}
