import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PurchaseOrder, Prisma } from '@prisma/client';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PurchaseOrderService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.PurchaseOrderCreateInput): Promise<PurchaseOrder> {
    return this.prisma.purchaseOrder.create({
      data,
      include: { purchaseOrderDetails: true },
    });
  }

  async findAll(): Promise<PurchaseOrder[]> {
    return this.prisma.purchaseOrder.findMany({ include: { purchaseOrderDetails: true } });
  }

  async findOne(purchase_order_id: string): Promise<PurchaseOrder | null> {
    return this.prisma.purchaseOrder.findUnique({
      where: { purchase_order_id },
      include: { purchaseOrderDetails: true },
    });
  }

  async update(purchase_order_id: string, updateOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    const data: Prisma.PurchaseOrderUpdateInput = {
      ...updateOrderDto,
      purchaseOrderDetails: updateOrderDto.purchaseOrderDetails
        ? {
          update: updateOrderDto.purchaseOrderDetails.map(item => {
            const quantity = new Decimal(item.quantity.toString());
            const unitPrice = new Decimal(item.unit_price.toString());
            const totalPrice = quantity.times(unitPrice);

            return {
              where: { purchase_order_detail_id: item.purchase_order_detail_id },
              data: {
                quantity: item.quantity,
                unit_price: item.unit_price,
                totalPrice: totalPrice.toNumber(), 
              },
            };
          }),
        }
        : undefined,
    };

    return await this.prisma.purchaseOrder.update({
      where: { purchase_order_id },
      data,
    });
  }


  async remove(purchase_order_id: string): Promise<PurchaseOrder> {
    return this.prisma.purchaseOrder.delete({
      where: { purchase_order_id },
    });
  }

}
