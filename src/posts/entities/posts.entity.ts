import { User } from 'src/users/entities/User.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(type => User, (user) => user.id)
    user: User;

    @Column({type: "uuid"})
    userId:number;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;



}
