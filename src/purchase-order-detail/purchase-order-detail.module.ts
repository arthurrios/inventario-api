import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';

@Module({
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
  exports: [PrismaService]
})
export class PurchaseOrderDetailModule { }
