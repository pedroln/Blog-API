import { Body, Controller, Delete, ExecutionContext, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';

import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAllPost();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createPost')
  create(@Req() req, @Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(req, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deletePost/:id')
  delete(@Req() req, @Param('id') id: string) {
    return this.postsService.delete(req, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updatePost/:id')
  update(@Req() req, @Param('id') id: string, @Body(ValidationPipe) updatePostDto : UpdatePostDto) {
    return this.postsService.update(req, +id, updatePostDto);
  }


  
}