import { UpdateResult } from 'typeorm';
import { Post } from '../entities/posts.entity';

export class ReturnUpdatedPostDto {
  updatedPost: Post;
  message: string;
}