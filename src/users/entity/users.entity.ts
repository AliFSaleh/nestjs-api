import { 
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";

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
    role: RoleEnumType.USER

    @Column({
        default: 'default.png',
    })
    photo: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    static async comparePassword (password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}