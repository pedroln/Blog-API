import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PostsModule } from 'src/posts/Posts.module';
import { ProteinsModule } from 'src/proteins/proteins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/User.entity';
import { LoggedUser } from './entities/loggedUser.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([LoggedUser]), forwardRef(() =>AuthModule),  PostsModule, ProteinsModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
