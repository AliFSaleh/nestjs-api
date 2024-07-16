import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, MinDate } from "class-validator";

export class createReservationDto {
    @IsNotEmpty()
    @IsNumber()
    real_estate_id: number

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value) )
    @IsDate()
    @MinDate(new Date())
    start_date: Date;

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value) )
    @IsDate()
    @MinDate(new Date())
    end_date: Date
}