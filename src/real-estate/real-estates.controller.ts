import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { RealEstatesService } from './real-estates.service';
import { CreateRealEstateDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnumType } from 'src/users/entity/users.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('api/real-estates')
export class RealEstatesController {
    constructor (
        private realEstateService: RealEstatesService
    ) {}

    @Get('/')
    findRealEstates () {
        return this.realEstateService.findRealEstates()
    }

    @Roles(RoleEnumType.HOST)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'files', maxCount: 10},
        {name: 'main_image', maxCount: 1}
    ], multerOptions))
    @Post('/')
    createRealEstate (
        @UploadedFiles() images: {files?: Express.Multer.File[], main_image?: Express.Multer.File},
        @Body() data,
        @Req() req
    ) {        
        return this.realEstateService.createRealEstate(req.user.sub, images, data)
    }

    @Get('/:id')
    findRealEstate (
        @Param('id') realEstateId: number
    ) {
        return this.realEstateService.findRealEstate(realEstateId)
    }

    @Roles(RoleEnumType.HOST)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'files', maxCount: 10},
        {name: 'main_image', maxCount: 1}
    ], multerOptions))
    @Patch('/:id')
    updateRealEstate (
        @UploadedFiles() images: {files?: Express.Multer.File[], main_image?: Express.Multer.File},
        @Param('id') realEstateId: number,
        @Body() data,
        @Req() req,
    ) {
        return this.realEstateService.updateRealEstate(req.user.sub, realEstateId, data, images)
    }

    @Roles(RoleEnumType.HOST, RoleEnumType.ADMIN)
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteRealEstate (
        @Param('id') realEstateId: number
    ) {
        return this.realEstateService.deleteRealEstate(realEstateId)
    }
}
