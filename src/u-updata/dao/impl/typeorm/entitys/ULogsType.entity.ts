import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ULogsType {
    @PrimaryGeneratedColumn()
    ult_id: number;

    @Column()
    type: string;

    @Column()
    analysis: string;

    @Column()
    remark: string;
    
}