import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UUploadlUser {
    @PrimaryGeneratedColumn()
    us_id: number;

    @Column({
        unique: true,
    })
    u_id: number;
}