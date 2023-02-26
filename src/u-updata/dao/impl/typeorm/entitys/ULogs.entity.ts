import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ULogs {
    @PrimaryGeneratedColumn()
    ul_id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    type: string;

    @Column({
        type: 'text',
    })
    value: string;
    
    @Column({
        type: 'date',
    })
    time: Date;
}