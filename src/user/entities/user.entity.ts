import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';

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
  type: UserType;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  profilePicture: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
