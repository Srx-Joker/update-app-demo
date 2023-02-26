import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: "u_upload_user",
    synchronize: true,
})
export class UUploadlUser {
    @PrimaryGeneratedColumn()
    us_id: number;

    @Column({
        unique: true,
    })
    u_id: number;
}