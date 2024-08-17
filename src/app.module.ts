import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product/product.module';
import { ProductController } from './product/product/product.controller';
import { ProductService } from './product/product/product.service';

@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
