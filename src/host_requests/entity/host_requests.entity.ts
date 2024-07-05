import { User } from "src/users/entity/users.entity";
import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export enum StatusEnumType {
    PENDING= 'pending',
    CONFIRMED= 'confirmed',
    REJECTED= 'rejected'
}

@Entity('host_requests')
export class HostRequest {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.hostRequest)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    file: string

    @Column({
        type: 'enum',
        enum: StatusEnumType,
        default: StatusEnumType.PENDING
    })
    status: StatusEnumType

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}