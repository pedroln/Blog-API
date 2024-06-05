import { User } from '../entities/User.entity';



export class ReturnUserDto {
  user: User;
  message: string;
}