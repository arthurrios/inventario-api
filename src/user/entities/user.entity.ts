import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  avatar_url: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
