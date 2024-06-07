import { Comment } from "../entities/comment.entity";

export class ReturnDeletedCommentDto {
  deletedComment: Comment;
  message: string;
}