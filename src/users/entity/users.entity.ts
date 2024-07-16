import { 
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";
import { HostRequest } from "src/host_requests/entity/host_requests.entity";
import { RealEstate } from "src/real-estate/entity/real-estates.entity";
import { Reservation } from "src/reservations/entity/reservations.entity";

export enum RoleEnumType {
    ADMIN = 'admin',
    HOST = 'host',
    USER = 'user',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Exclude()
    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER
    })
    role: RoleEnumType

    @Column({
        default: 'default.png',
    })
    photo: string;

    @OneToMany(() => HostRequest, (hostRequest) => hostRequest.user)
    hostRequest: HostRequest[]

    @OneToMany(() => RealEstate, (real_estate) => real_estate.user)
    real_estates: RealEstate[]

    @OneToMany(() => Reservation, (reservations) => reservations.user )
    reservations: Reservation[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    static async comparePassword (password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}