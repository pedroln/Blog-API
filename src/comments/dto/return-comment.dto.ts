import { Comment } from "../entities/comment.entity";


export class ReturnCommentDto {
  comment: Comment;
  message: string;
}