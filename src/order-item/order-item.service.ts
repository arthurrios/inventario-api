import { Injectable } from '@nestjs/common';

import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  create(createOrderItemDto: OrderItemDto) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
