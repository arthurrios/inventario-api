import { ConfigModule } from 'src/config/config.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
