import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import {  SaleDetailController } from './sale-order-detail.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SaleDetailController],
  providers: [SaleDetailService],
  exports: [PrismaService]
})
export class SaleDetailModule { }
