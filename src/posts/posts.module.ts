import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedUser } from 'src/users/entities/loggedUser.entity';
import { User } from 'src/users/entities/User.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsModule } from 'src/comments/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([LoggedUser]), TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([User]), CommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
