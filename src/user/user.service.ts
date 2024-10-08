import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(user_id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { user_id } });
    return user ? new UserEntity(user) : null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return new UserEntity(user);
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
    return new UserEntity(user);
  }

  async remove(user_id: string): Promise<UserEntity> {
    const user = await this.prisma.user.delete({ where: { user_id } });
    return new UserEntity(user);
  }
}
