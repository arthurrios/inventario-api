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
import { PurchaseOrderService } from './purchase-order.service';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';;
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { stat } from 'fs';
import { PurchaseOrderEntity} from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrder } from '@prisma/client';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('order')
@ApiTags('order')
export class PurchaseOrderController {
  constructor(private readonly orderService: PurchaseOrderService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: PurchaseOrderEntity })
  async create(@Body() createOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    // Calculate totalAmount using Decimal.js methods
    const totalAmount = createOrderDto.purchaseOrderDetails.reduce((sum, item) => {
      const quantity = item.quantity instanceof Decimal ? item.quantity : new Decimal(item.quantity);
      const unitPrice = item.unit_price instanceof Decimal ? item.unit_price : new Decimal(item.unit_price);
      return sum.plus(quantity.times(unitPrice));
    }, new Decimal(0));

    const purchaseOrderData = {
      supplier_id: createOrderDto.supplier_id,
      supplier: { connect: { supplier_id: createOrderDto.supplier_id } },
      order_date: createOrderDto.order_date,
      totalAmount: totalAmount.toNumber(), 
      status: createOrderDto.status,
      purchaseOrderDetails: {
        create: createOrderDto.purchaseOrderDetails.map(item => {

          const quantity = item.quantity instanceof Decimal ? item.quantity : new Decimal(item.quantity);
          const unitPrice = item.unit_price instanceof Decimal ? item.unit_price : new Decimal(item.unit_price);
          const totalPrice = quantity.times(unitPrice).toNumber(); 

          return {
            product_id: item.product_id,
            product: { connect: { product_id: item.product_id } },
            quantity: quantity.toNumber(), 
            unit_price: unitPrice.toNumber(),
            totalPrice,
          };
        }),
      },
    };

    return this.orderService.create(purchaseOrderData);
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: PurchaseOrderEntity, isArray: true })
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: PurchaseOrderEntity, isArray: true })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: PurchaseOrderEntity })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: PurchaseOrderEntity })
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
