import { Post } from '../entities/posts.entity';

export class ReturnUpdatedPostDto {
  updatedPost: Post;
  message: string;
}