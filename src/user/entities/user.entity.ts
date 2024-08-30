import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';

export class UserEntity implements User {

  user_id: string;
  username: string;
  email: string;
  role: UserRole;
  googleId: string;
  avatar_url: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
