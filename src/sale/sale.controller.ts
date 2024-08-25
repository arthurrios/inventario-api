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
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';;
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { stat } from 'fs';
import { SaleService } from './sale.service';
import { SaleEntity } from './entities/sale.entity';
import { Sale } from '@prisma/client';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('order')
@ApiTags('order')
export class SaleController {
  constructor(private readonly orderService: SaleService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: SaleEntity })
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    const totalAmount = createSaleDto.saleDetails.reduce((sum, item) => {
      const quantity = item.quantity instanceof Decimal ? item.quantity : new Decimal(item.quantity);
      const unitPrice = item.unit_price instanceof Decimal ? item.unit_price : new Decimal(item.unit_price);
      return sum.plus(quantity.times(unitPrice));
    }, new Decimal(0));


    const saleData = {
      customer_id: createSaleDto.customer_id,
      customer: { connect: { customer_id: createSaleDto.customer_id } },
      sale_date: createSaleDto.sale_date,
      totalAmount,
      status: createSaleDto.status, 
      saleDetails: {
        create: createSaleDto.saleDetails.map(item => ({
          product_id: item.product_id,
          product: { connect: { product_id: item.product_id } },
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      },
    };
    return this.orderService.create(saleData);
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SaleEntity, isArray: true })
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SaleEntity, isArray: true })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SaleEntity })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateSaleDto): Promise<Sale> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SaleEntity })
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
