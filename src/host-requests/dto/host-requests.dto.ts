import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { StatusEnumType } from "../entity/host-requests.entity";

export class CreateHostRequestDto {
    @IsNotEmpty()
    @IsString()
    file: string

    @IsNumber()
    user;
}

export class SearchHostRequestsDto {
    @IsOptional()
    @IsEnum(StatusEnumType)
    status: StatusEnumType

    @IsOptional()
    userId: number;
}