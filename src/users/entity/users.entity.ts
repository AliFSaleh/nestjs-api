import { 
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'

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

    @Column()
    email: string

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

    @BeforeInsert()
    async hashPassword () {
        this.password = await bcrypt.hash(this.password, 12)
    }

    static async comparePassword (password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}