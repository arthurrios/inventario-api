import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }
  
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
      include: { items: true },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const data: Prisma.OrderUpdateInput = {
      ...updateOrderDto,
      items: updateOrderDto.items
        ? {
          update: updateOrderDto.items.map(item => ({
            where: { id: item.productId }, // Assuming items have unique IDs
            data: {
              quantity: item.quantity,
              unit_price: item.unit_price,
              totalPrice: item.quantity * item.unit_price,
              status: item.status,
            },
          })),
        }
        : undefined,
    };

    return this.prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    });
  }

  async remove(id: string): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
    });
  }

}
