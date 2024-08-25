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
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailDto } from './dto/sale-detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import { Sale } from '@prisma/client';
;

@Controller('order-item')
@ApiTags('order-item')
export class SaleDetailController {
  constructor(private readonly orderItemService: SaleDetailService) { }

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  create(@Body() createSaleDetailDto: SaleDetailDto) {
    return this.orderItemService.create(createSaleDetailDto);
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  //@UseGuards(GoogleOAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSaleDetailDto: UpdateSaleDetailDto,
  ) {
    return this.orderItemService.update(+id, updateSaleDetailDto);
  }

  @Delete(':id')
  //@UseGuards(GoogleOAuthGuard)
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
