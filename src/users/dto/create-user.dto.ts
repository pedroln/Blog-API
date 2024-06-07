import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
  
    id: number;

    @MaxLength(100, {
      message: 'O nome de usuário deve ter menos de 100 caracteres',
    })
    @IsNotEmpty({
      message: 'Informe um endereço de usuário',
    })
    name: string;
  
    @IsEmail(
      {},
      {
        message: 'Informe um endereço de email válido (exemplo@email.com)',
      },
    )
    @MaxLength(191, {
      message: 'O endereço de email deve ter menos de 191 caracteres',
    })
    @IsNotEmpty({
      message: 'Informe um endereço de email',
    })
    email: string;

  
    @MinLength(6, {
      message: 'A senha deve ter no mínimo 6 caracteres',
    })
    @IsNotEmpty({
      message: 'Informe uma senha',
    })
    password: string;
  }