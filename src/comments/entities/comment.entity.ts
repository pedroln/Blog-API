import { Post } from 'src/posts/entities/posts.entity';
import { User } from 'src/users/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(type => User, (user) => user.id)
    user: User;

    @Column({type: "uuid"})
    userId:number;

    @ManyToOne(type => Post, (user) => user.id)
    post: Post;

    @Column({type: "uuid"})
    postId:number;

    @Column({ type: 'varchar', length: 200 })
    description: string;



}
