import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UConfig{
    @PrimaryGeneratedColumn()
    uc_id: number;

    @Column({
        unique: true,
        type: 'varchar',
        length: 255,
    })
    configItem: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    value: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    remark: string;
}