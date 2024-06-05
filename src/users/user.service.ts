import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { LoggedUser } from './entities/loggedUser.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(LoggedUser) private readonly loggedUserRepository: Repository<LoggedUser>
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) : Promise<ReturnUserDto> {
    var repeatedEmail = false;

    const users = await this.findAllUsers();
    console.log(users)

    for (let index in users) {
        console.log(users[index].email)
        if (users[index].email == createUserDto.email) {
            repeatedEmail = true;
        }
    }

    if (repeatedEmail == true) {
        throw new HttpException('Email já existente no banco de dados', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.save(createUserDto);
    return {
        user,
        message: 'Usuário cadastrado com sucesso',
    };
}

async createLoggedUser(user: User, token: string) {
    const loggedUser = new LoggedUser()
    loggedUser.user_id = user.id
    loggedUser.token = token
    console.log(await this.loggedUserRepository.save(loggedUser))
    this.loggedUserRepository.save(loggedUser)
}

async findByEmail(email): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
}



}
