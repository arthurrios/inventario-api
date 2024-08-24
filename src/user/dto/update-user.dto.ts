import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserType } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  name: string;
  email: string;
  type: UserType;
  googleId: string;
  profilePicture: string;

}
