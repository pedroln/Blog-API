import {
    IsNotEmpty,
    MaxLength,
} from 'class-validator';
import { Post } from 'src/posts/entities/posts.entity';
import { User } from 'src/users/entities/User.entity';

export class CreateCommentDto {

    id: number;

    user: User;

    post: Post;


    @IsNotEmpty({
        message: 'Informe uma descrição',
    })
    description: string;

}