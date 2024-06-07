import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { LoggedUser } from './entities/loggedUser.entity';
import { ReturnDeletedUserDto } from './dto/return-deleted-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUpdatedUserDto } from './dto/return-updated-user.dto';
import { Post } from 'src/posts/entities/posts.entity';
import { PostsService } from 'src/posts/posts.service';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(LoggedUser) private readonly loggedUserRepository: Repository<LoggedUser>,
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        private readonly postsService: PostsService

    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } })
      }

    async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        var repeatedEmail = false;

        const users = await this.findAllUsers();

        for (let index in users) {
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
    async delete(req, id: number): Promise<ReturnDeletedUserDto> {

        const authKey = req.headers.authorization;
        const loggedUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
        const foundUser = await this.userRepository.findOne({ where: { id: id } })
        const foundPost = await this.postRepository.find()


        if (!foundUser) {
            throw new HttpException('Usuário com o ID para deletar inexistente', HttpStatus.NOT_FOUND);
        }

        else if (foundUser.id !== loggedUser.user_id) {
            throw new HttpException('Usuário logado não é o dono da conta, não foi possível apagar sua conta', HttpStatus.BAD_REQUEST);
        }

        if (foundPost) {
            for (let index in foundPost) {
              if (foundPost[index].userId == foundUser.id) {
                await this.postsService.delete(req, foundPost[index].id)
              }
            }
          }


        const deletedUser = foundUser
        await this.userRepository.delete(id)

        return {
            deletedUser,
            message: 'Usuário deletado com sucesso',
        }

    }

    async update(req, id:number, updateUserDto : UpdateUserDto) : Promise<ReturnUpdatedUserDto>{
  
        const authKey = req.headers.authorization;
        const loggedUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
        const foundUser = await this.userRepository.findOne({where : {id : id}})
      
      
        if(!foundUser){
          throw new HttpException('Usuário com o ID para atualizar inexistente', HttpStatus.NOT_FOUND);
        }
      
      
        else if(foundUser.id !== loggedUser.user_id){
          throw new HttpException('Usuário logado não é o correto, não foi possível atualizá-lo', HttpStatus.BAD_REQUEST);
        }
      
          updateUserDto.id = foundUser.id;
          await this.userRepository.save(updateUserDto)
          const updatedUser = await this.userRepository.findOne({where : {id: id}})
      
          return {
            updatedUser,
            message: 'Post atualizado com sucesso',
          }
      }


    async createLoggedUser(user: User, token: string) {
        const loggedUser = new LoggedUser()
        loggedUser.user_id = user.id
        loggedUser.token = token
        this.loggedUserRepository.save(loggedUser)
    }

    async findByEmail(email): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email } });
    }



}
