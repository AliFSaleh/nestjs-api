import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/categories.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
    constructor (
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async findCategories(q) {
        const options: FindManyOptions = {}
        if(q)
            options.where = {name: Like(`%${q}%`)}

        const categories = await this.categoryRepository.find(options)
        return categories
    }

    async createCategory(data: CreateCategoryDto){
        return await this.categoryRepository.save(data)
    }

    async updateCategory(categoryId: number, data: UpdateCategoryDto) {
        return await this.categoryRepository.update(categoryId, data)
    }

    async deleteCategory(categoryId: number) {
        return await this.categoryRepository.delete(categoryId)
    }
}
