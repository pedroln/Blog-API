import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { ReturnPostDto } from './dto/return-post.dto';
import { LoggedUser } from 'src/users/entities/loggedUser.entity';
import { User } from 'src/users/entities/User.entity';
import { ReturnDeletedPostDto } from './dto/return-deleted-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReturnUpdatedPostDto } from './dto/return-updated-post.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsService } from 'src/comments/comment.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(LoggedUser) private readonly loggedUserRepository: Repository<LoggedUser>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    private readonly CommentsService: CommentsService


  ) { }

  async findAllPost(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } })
  }

  async create(req, createPostDto: CreatePostDto): Promise<ReturnPostDto> {

    const authKey = req.headers.authorization;
    const foundUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })

    if (foundUser) {
      createPostDto.user = await this.userRepository.findOne({ where: { id: foundUser.user_id } })
    }

    else {
      throw new HttpException({ error: 'Usuario não encontrado' }, HttpStatus.NOT_FOUND)
    }

    const post = await this.postRepository.save(createPostDto);
    return {
      post,
      message: 'Post cadastrado com sucesso',
    };
  }

  async delete(req, id: number): Promise<ReturnDeletedPostDto> {

    const authKey = req.headers.authorization;
    const loggedUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
    const foundPost = await this.postRepository.findOne({ where: { id: id } })
    const postComments = await this.commentRepository.find()


    if (!foundPost) {
      throw new HttpException('Post com o ID para deletar inexistente', HttpStatus.NOT_FOUND);
    }

    else if (foundPost.userId !== loggedUser.user_id) {
      throw new HttpException('Usuário logado não é o criador da postagem, não foi possível apagá-la', HttpStatus.BAD_REQUEST);
    }

    if (postComments) {
      for (let index in postComments) {
        if (postComments[index].postId == foundPost.id) {
          await this.CommentsService.delete(req, postComments[index].id)
        }
      }
    }

    
    const deletedPost = foundPost
    await this.postRepository.delete(id)

    return {
      deletedPost,
      message: 'Post deletado com sucesso',
    }


  }

  async update(req, id: number, updatePostDto: UpdatePostDto): Promise<ReturnUpdatedPostDto> {

    const authKey = req.headers.authorization;
    const loggedUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
    const foundPost = await this.postRepository.findOne({ where: { id: id } })


    if (!foundPost) {
      throw new HttpException('Post com o ID para atualizar inexistente', HttpStatus.NOT_FOUND);
    }


    else if (foundPost.userId !== loggedUser.user_id) {
      throw new HttpException('Usuário logado não é o criador da postagem, não foi possível atualizá-la', HttpStatus.BAD_REQUEST);
    }

    updatePostDto.id = foundPost.id;
    updatePostDto.user = foundPost.user
    await this.postRepository.save(updatePostDto)
    const updatedPost = await this.postRepository.findOne({ where: { id: id } })

    return {
      updatedPost,
      message: 'Post atualizado com sucesso',
    }
  }

}


