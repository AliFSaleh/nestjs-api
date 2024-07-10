import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real-estates.entity";

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    filename: string

    @Column()
    path: string

    @ManyToOne(() => RealEstate, (real_estate) => real_estate.images)
    @JoinColumn({ name: 'real_estate_id' })
    real_estate: RealEstate
}