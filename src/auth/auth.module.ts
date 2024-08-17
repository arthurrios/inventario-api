import { ConfigModule } from 'src/config/config.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UserModule
  ],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
