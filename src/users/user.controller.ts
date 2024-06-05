import { Controller, Request,  Post, Body,UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiKeyGuard } from 'src/auth/api-key-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService
  ) {}


  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const token = (await this.authService.login(req.user)).access_token
    this.usersService.createLoggedUser(req.user,token)
    return this.authService.login(req.user);
  }
}
