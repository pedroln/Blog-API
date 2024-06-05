import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UsersModule, PostsModule],
})
export class AppModule {}
