import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
  
    id: number;

    @MaxLength(100, {
      message: 'O nome de usuário deve ter menos de 100 caracteres',
    })
    @IsOptional()
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
    @IsOptional()

    email: string;

  
    @MinLength(6, {
      message: 'A senha deve ter no mínimo 6 caracteres',
    })
    @IsOptional()
    password: string;
  }