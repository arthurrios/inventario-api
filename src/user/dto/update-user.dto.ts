import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  googleId: string;
  profilePicture: string;

}
