import { RealEstate } from "src/real-estate/entity/real-estates.entity";
import { User } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({ name:'user_id' })
    user: User

    @ManyToOne(() => RealEstate, (realEstate) => realEstate.reservations)
    @JoinColumn({ name: 'real_estate_id' })
    real_estate: RealEstate

    @Column()
    cost: number

    @Column({ type: 'date' })
    start_date: Date

    @Column({ type: 'date' })
    end_date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}