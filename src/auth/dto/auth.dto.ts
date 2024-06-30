import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}