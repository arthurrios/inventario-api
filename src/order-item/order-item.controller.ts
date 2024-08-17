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
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';;

@Controller('order-item')
@ApiTags('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) { }

  @Post()
  @UseGuards(GoogleOAuthGuard)
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @UseGuards(GoogleOAuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(GoogleOAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  @UseGuards(GoogleOAuthGuard)
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
