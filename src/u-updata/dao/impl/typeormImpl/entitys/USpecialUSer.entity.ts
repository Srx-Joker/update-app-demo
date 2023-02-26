import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class USpecialUser {
    @PrimaryGeneratedColumn()
    us_id: number;

    @Column({
        unique: true,
    })
    u_id: number;
    
    @Column({
        type: 'varchar',
        length: 255
    })
    us_version: string;
}