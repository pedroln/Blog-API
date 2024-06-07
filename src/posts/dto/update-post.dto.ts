import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/User.entity';

export class UpdatePostDto {

    id: number;

    user: User;


    @MaxLength(100, {
        message: 'O titulo deve ter menos de 100 caracteres',
    })
    @IsOptional()
    title: string;


    @IsOptional()
    description: string;

}