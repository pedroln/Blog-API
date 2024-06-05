import { User } from "../entities/User.entity";

export class ReturnUpdatedUserDto {
  updatedUser: User;
  message: string;
}