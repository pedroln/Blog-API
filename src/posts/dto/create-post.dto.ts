import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/User.entity';

export class CreatePostDto {

    id: number;

    user: User;


    @MaxLength(100, {
        message: 'O titulo deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe um titulo',
    })
    title: string;


    @IsNotEmpty({
        message: 'Informe um titulo',
    })
    description: string;

}