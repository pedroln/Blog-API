import { Post } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 191 })
    email: string;

    @Column({ type: 'varchar', length: 3000 })
    password: string;

    @OneToMany(type =>  Post, (data) => data.id)
    posts: Post[];

}
