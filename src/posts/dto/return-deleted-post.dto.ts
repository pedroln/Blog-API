import { DeleteResult } from 'typeorm';
import { Post } from '../entities/posts.entity';


export class ReturnDeletedPostDto {
  deletedPost: Post;
  message: string;
}