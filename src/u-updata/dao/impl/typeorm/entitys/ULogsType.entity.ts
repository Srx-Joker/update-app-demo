import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ULogsType {
    @PrimaryGeneratedColumn()
    ult_id: number;

    @Column({
        unique: true,
        type: 'varchar',
        length: 255
    })
    type: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    analysis: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    remark: string;
    
}