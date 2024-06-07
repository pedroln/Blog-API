import { Comment } from "../entities/comment.entity";

export class ReturnUpdatedCommentDto {
  updatedComment: Comment;
  message: string;
}