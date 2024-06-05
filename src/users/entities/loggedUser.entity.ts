import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class LoggedUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    user_id: number;
  
    @Column({ type: 'varchar'})
    token: string;


}