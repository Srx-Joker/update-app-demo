import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UFileVerions {
    @PrimaryGeneratedColumn()
    uf_id: number;

    @Column({
        unique: true,
        type: 'varchar',
        length:  20
    })
    version: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    file_name: string;

}