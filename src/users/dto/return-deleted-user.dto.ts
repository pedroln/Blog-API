import { User } from '../entities/User.entity';


export class ReturnDeletedUserDto {
  deletedUser: User;
  message: string;
}