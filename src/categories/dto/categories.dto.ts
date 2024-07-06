import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    image
}

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    image
}