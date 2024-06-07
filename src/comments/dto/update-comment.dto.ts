import {
    IsOptional,
} from 'class-validator';
import { Post } from 'src/posts/entities/posts.entity';
import { User } from 'src/users/entities/User.entity';

export class UpdateCommentDto {

    id: number;

    user: User;

    post: Post;

    @IsOptional()
    description: string;

}