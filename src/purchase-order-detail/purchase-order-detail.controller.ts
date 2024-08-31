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
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import { PurchaseOrder } from '@prisma/client';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';


@Controller('order-item')
@ApiTags('order-item')
export class PurchaseOrderDetailController {
  constructor(private readonly purchaseOrderDetailService: PurchaseOrderDetailService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  create(@Body() createOrderItemDto: CreatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.create(createOrderItemDto);
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  findAll() {
    return this.purchaseOrderDetailService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  findOne(@Param('id') id: string) {
    return this.purchaseOrderDetailService.findOne(+id);
  }

  @Patch(':id')
  //@UseGuards(GoogleOAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ) {
    return this.purchaseOrderDetailService.update(+id, updatePurchaseOrderDetailDto);
  }

  @Delete(':id')
  //@UseGuards(GoogleOAuthGuard)
  remove(@Param('id') id: string) {
    return this.purchaseOrderDetailService.remove(+id);
  }
}
