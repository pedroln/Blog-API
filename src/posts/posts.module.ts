import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedUser } from 'src/users/entities/loggedUser.entity';
import { User } from 'src/users/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([LoggedUser]), TypeOrmModule.forFeature([User])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
