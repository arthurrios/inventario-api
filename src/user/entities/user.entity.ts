import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

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
  type: string;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  profilePicture: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
