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
import { CreatePurchaseOrderDTO } from './dto/create-purchase-order.dto';
import { PurchaseOrder } from '@prisma/client';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('purchase-order')
@ApiTags('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly orderService: PurchaseOrderService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: PurchaseOrderEntity })
  async create(@Body() createOrderDto: CreatePurchaseOrderDTO): Promise<PurchaseOrder> {
    // Calculate totalAmount using Decimal.js methods
    const totalAmount = createOrderDto.purchaseOrderDetails.reduce((sum, item) => {
      const quantity = Decimal.isDecimal(item.quantity) ? item.quantity : new Decimal(item.quantity);
      const unitPrice = Decimal.isDecimal(item.unit_price) ? item.unit_price : new Decimal(item.unit_price);
      return sum.plus(quantity.times(unitPrice));
    }, new Decimal(0));

    const purchaseOrderData = {
      supplier: { connect: { supplier_id: createOrderDto.supplier_id } },
      order_date: createOrderDto.order_date,
      status: createOrderDto.status,
      purchaseOrderDetails: {
        create: createOrderDto.purchaseOrderDetails.map(item => {

          const quantity = Decimal.isDecimal(item.quantity) ? item.quantity : new Decimal(item.quantity);
          const unitPrice = Decimal.isDecimal(item.unit_price) ? item.unit_price : new Decimal(item.unit_price);
          const totalPrice = quantity.times(unitPrice).toNumber(); 

          return {
            product: { connect: { product_id: item.product_id } },
            quantity: quantity.toNumber(), 
            unit_price: unitPrice.toNumber()
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
