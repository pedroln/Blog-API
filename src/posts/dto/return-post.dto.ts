import { User } from "src/users/entities/User.entity";
import { Post } from "../entities/posts.entity";


export class ReturnPostDto {
  post: Post;
  message: string;
}