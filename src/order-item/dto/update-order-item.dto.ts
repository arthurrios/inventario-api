import { PartialType } from '@nestjs/mapped-types';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderItemDto extends PartialType(OrderItemDto) { }
