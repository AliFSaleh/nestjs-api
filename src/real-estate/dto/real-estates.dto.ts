import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRealEstateDto {
    user
    category

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    category_id: number
    
    @IsNotEmpty()
    @IsString()
    readonly name: string
    
    @IsNotEmpty()
    @IsString()
    readonly description: string
    
    @IsNotEmpty()
    @IsString()
    readonly address: string
    
    @IsNotEmpty()
    @IsNumber()
    readonly price_per_day: number
    
    @IsNotEmpty()
    @IsNumber()
    readonly price_per_week: number
    
    @IsNotEmpty()
    @IsNumber()
    readonly price_per_month: number
    
    @IsNotEmpty()
    @IsNumber()
    readonly lat: number
    
    @IsNotEmpty()
    @IsNumber()
    readonly lng: number
    
    @IsOptional()
    @IsString()
    main_image: string
    
    @IsOptional()
    @IsBoolean()
    readonly available: boolean
}

export class UpdateRealEstateDto {
    user

    @IsOptional()
    @IsNumber()
    readonly category_id: number
    
    @IsOptional()
    @IsString()
    readonly name: string
    
    @IsOptional()
    @IsString()
    readonly address: string
    
    @IsOptional()
    @IsNumber()
    readonly price_per_day: number
    
    @IsOptional()
    @IsNumber()
    readonly price_per_week: number
    
    @IsOptional()
    @IsNumber()
    readonly price_per_month: number
    
    @IsOptional()
    @IsNumber()
    readonly lat: number
    
    @IsOptional()
    @IsNumber()
    readonly lng: number
    
    @IsOptional()
    @IsBoolean()
    readonly available: boolean
}