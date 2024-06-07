import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedUser } from 'src/users/entities/loggedUser.entity';
import { User } from 'src/users/entities/User.entity';
import { Post } from 'src/posts/entities/posts.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([LoggedUser]), TypeOrmModule.forFeature([User])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
