import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, ProductModule, UserModule, OrderModule, CategoryModule, SupplierModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
