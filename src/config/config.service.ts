import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get google() {
    return {
      clientID: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: this.configService.get<string>('GOOGLE_CALLBACK_URL'),
    };
  }

  get jwt() {
    return {
      jwtSecret: this.configService.get<string>('JWT_SECRET'),
    };
  }
}
