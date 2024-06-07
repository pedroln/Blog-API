import { Controller, Request,  Post, Body,UseGuards, ValidationPipe, Delete, Param, Put, Req, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiKeyGuard } from 'src/auth/api-key-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('createUser')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('updateUser/:id')
  update(@Req() req, @Param('id') id: string, @Body(ValidationPipe) updatePostDto : UpdateUserDto) {
    return this.usersService.update(req, +id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteUser/:id')
  delete(@Req() req, @Param('id') id: string) {
    return this.usersService.delete(req, +id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const token = (await this.authService.login(req.user)).access_token
    this.usersService.createLoggedUser(req.user,token)
    return this.authService.login(req.user);
  }


}
