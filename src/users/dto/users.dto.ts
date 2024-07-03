import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    photo: string
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    photo: string
}