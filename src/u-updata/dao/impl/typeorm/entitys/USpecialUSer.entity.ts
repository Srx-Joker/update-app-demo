import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class USpecialUser {
    @PrimaryGeneratedColumn()
    us_id: number;

    @Column()
    u_id: number;
    
    @Column()
    us_version: string;
}