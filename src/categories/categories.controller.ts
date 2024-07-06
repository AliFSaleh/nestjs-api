import { Body, Controller, Delete, Get, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnumType } from 'src/users/entity/users.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/categories')
export class CategoriesController {
    constructor (
        private categoriesService: CategoriesService
    ) {}

    @Get('/')
    getCategories(
        @Query('q') q: string
    ) {
        return this.categoriesService.findCategories(q)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.ADMIN)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @Post('/')
    createCategory (
        @UploadedFile(new ParseFilePipe({validators: []}))
        file: Express.Multer.File,
        @Body() data: CreateCategoryDto
    ) {
        data.image = file.path
        return this.categoriesService.createCategory(data)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.ADMIN)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @Patch('/:id')
    updateCategory (
        @UploadedFile()
        file: Express.Multer.File,
        @Body() data: UpdateCategoryDto,
        @Param('id') categoryId: number
    ) {
        if(file)
            data.image = file.path

        return this.categoriesService.updateCategory(categoryId, data)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.ADMIN)
    @Delete('/:id')
    deleteCategory (
        @Param('id') categoryId: number
    ) {
        return this.categoriesService.deleteCategory(categoryId)
    }
}
