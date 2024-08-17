import { ConfigModule } from 'src/config/config.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [GoogleStrategy],
})
export class AuthModule {}
