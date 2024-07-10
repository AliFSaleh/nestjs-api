import { RealEstate } from "src/real-estate/entity/real-estates.entity";
import { 
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @OneToMany(() => RealEstate, (real_estate) => real_estate.category)
    real_estates: RealEstate[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}