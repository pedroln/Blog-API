import { Body, Controller, Delete,  Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comment.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.CommentsService.findAllComment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CommentsService.findOne(+id);
  }

  @Post(':id')
  create(@Req() req, @Param('id') id: string, @Body(ValidationPipe) createCommentDto: CreateCommentDto) {
    return this.CommentsService.create(req, +id, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    return this.CommentsService.delete(req, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body(ValidationPipe) updateCommentDto : UpdateCommentDto) {
    return this.CommentsService.update(req, +id, updateCommentDto);
  }


  
}