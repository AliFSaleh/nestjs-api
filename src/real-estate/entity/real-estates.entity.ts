import { Category } from "src/categories/entity/categories.entity";
import { User } from "src/users/entity/users.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Image } from "./images.entity";

@Entity('real-estates')
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.real_estates)
    @JoinColumn({name: 'host_id'})
    user: User

    @ManyToOne(() => Category, (category) => category.real_estates)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    address: string

    @Column()
    price_per_day: number

    @Column()
    price_per_week: number

    @Column()
    price_per_month: number

    @Column('decimal')
    lat: number

    @Column('decimal')
    lng: number

    @Column({
        default: true
    })
    available: boolean

    @Column({
        default: 0
    })
    views_count: number

    @Column()
    main_image: string

    @OneToMany(() => Image, (image) => image.real_estate, { eager: false })
    images: Image[]
}