import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ULogs {
    @PrimaryGeneratedColumn()
    ul_id: number;

    @Column()
    type: string;

    @Column()
    value: string;
    
    @Column()
    time: Date;
}