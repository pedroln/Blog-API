import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ReturnCommentDto } from './dto/return-comment.dto';
import { LoggedUser } from 'src/users/entities/loggedUser.entity';
import { User } from 'src/users/entities/User.entity';
import { ReturnDeletedCommentDto } from './dto/return-deleted-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ReturnUpdatedCommentDto } from './dto/return-updated-comment.dto';
import { Post } from 'src/posts/entities/posts.entity';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LoggedUser) private readonly loggedUserRepository: Repository<LoggedUser>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,


  ) { }

  async findAllComment(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const foundComment = await this.commentRepository.findOne({ where: { id } });
    if (!foundComment){
        throw new HttpException('Comentário com o ID para pesquisar inexistente', HttpStatus.NOT_FOUND);
    }
    return foundComment
  }

  async create(req, postId: number, createCommentDto: CreateCommentDto): Promise<ReturnCommentDto> {

    const authKey = req.headers.authorization;
    const foundUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
    const foundPost = await this.postRepository.findOne({ where: { id: postId } })

    if (!foundUser) {
      throw new HttpException({ error: 'Usuario não encontrado' }, HttpStatus.NOT_FOUND)
    }

    else if (!foundPost) {
      throw new HttpException({ error: 'Postagem não encontrada' }, HttpStatus.NOT_FOUND)
    }

    createCommentDto.user = await this.userRepository.findOne({ where: { id: foundUser.user_id } })
    createCommentDto.post = foundPost

    const comment = await this.commentRepository.save(createCommentDto);
    return {
      comment,
      message: 'Comentário cadastrado com sucesso',
    };

  }

  async delete(req, id: number): Promise<ReturnDeletedCommentDto> {

    const authKey = req.headers.authorization;
    const foundUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
    const foundComment = await this.commentRepository.findOne({ where: { id: id } })


    if (!foundUser) {
      throw new HttpException({ error: 'Usuario não encontrado' }, HttpStatus.NOT_FOUND)
    }

    if (foundComment) {
      const foundPost = await this.postRepository.findOne({ where: { id: foundComment.postId } })

      if (foundComment.userId !== foundUser.user_id && foundPost.userId !== foundUser.user_id) {
        throw new HttpException('Usuário logado não é o criador do comentário nem dono do post, não foi possível apagá-lo', HttpStatus.BAD_REQUEST);
      }
      else {
        const deletedComment = foundComment
        await this.commentRepository.delete(id)
        return {
          deletedComment,
          message: 'Comment deletado com sucesso',
        }
      }
    }

    else {
      throw new HttpException('Comment com o ID para deletar inexistente', HttpStatus.NOT_FOUND);
    }


  }

  async update(req, id: number, updateCommentDto: UpdateCommentDto): Promise<ReturnUpdatedCommentDto> {

    const authKey = req.headers.authorization;
    const foundUser = await this.loggedUserRepository.findOne({ where: { token: authKey } })
    const foundComment = await this.commentRepository.findOne({ where: { id: id } })

    if (!foundUser) {
      throw new HttpException({ error: 'Usuario não encontrado' }, HttpStatus.NOT_FOUND)
    }

    if (foundComment) {
      const foundPost = await this.postRepository.findOne({ where: { id: foundComment.postId } })

      if (foundComment.userId !== foundUser.user_id && foundPost.userId !== foundUser.user_id) {
        throw new HttpException('Usuário logado não é o criador do comentário nem dono do post, não foi possível atualizá-lo', HttpStatus.BAD_REQUEST);
      }
      else {
        updateCommentDto.id = foundComment.id
        updateCommentDto.user = foundComment.user
        updateCommentDto.post = foundComment.post
        await this.commentRepository.save(updateCommentDto)
        const updatedComment = await this.commentRepository.findOne({ where: { id: id } })
        return {
          updatedComment,
          message: 'Comentário atualizado com sucesso',
        }
      }
    }

    else {
      throw new HttpException('Comentário com o ID para atualizar inexistente', HttpStatus.NOT_FOUND);
    }

  }
}

