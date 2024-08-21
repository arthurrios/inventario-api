import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    profile: any,
  ): Promise<{ access_token: string; user: UserEntity }> {
    const { id: googleId, displayName, emails, photos } = profile;

    // Find user by Google ID
    let user = await this.prisma.user.findUnique({
      where: { googleId },
    });

    // If the user doesn't exist, create a new user
    if (!user) {
      const createUserDto: CreateUserDto = {
        googleId,
        email: emails[0].value,
        name: displayName,
        profilePicture: photos[0].value,
        type: 'user', // Default type for new users
      };

      user = await this.prisma.user.create({
        data: createUserDto,
      });
    }

    // Create a JWT payload
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: new UserEntity(user),
    };
  }
}
