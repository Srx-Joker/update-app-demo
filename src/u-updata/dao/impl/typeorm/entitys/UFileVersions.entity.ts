import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UFileVerions {
    @PrimaryGeneratedColumn()
    uf_id: number;

    @Column()
    version: string;

    @Column()
    file_name: string;

}