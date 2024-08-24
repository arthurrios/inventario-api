import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';;
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { Order } from '@prisma/client';
import { stat } from 'fs';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const totalAmount = createOrderDto.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
    const orderData = {
      supplierId: createOrderDto.supplierId,
      supplier: { connect: { id: createOrderDto.supplierId } },
      date: createOrderDto.date,
      totalAmount,
      items: {
        create: createOrderDto.items.map(item => ({
          productId: item.productId,
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          unit_price: item.unit_price,
          totalPrice: item.quantity * item.unit_price,
          status: item.status,  // Default to 'PENDING' if not provided
        })),
      },
    };
    return this.orderService.create(orderData);
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
