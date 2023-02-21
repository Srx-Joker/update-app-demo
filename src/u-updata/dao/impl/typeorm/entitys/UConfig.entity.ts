import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UConfig{
    @PrimaryGeneratedColumn()
    uc_id: number;

    @Column()
    configItem: string;

    @Column()
    value: string;

    @Column()
    remark: string;
}