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

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
