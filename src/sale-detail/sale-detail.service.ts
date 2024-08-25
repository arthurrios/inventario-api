import { Injectable } from '@nestjs/common';

import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { SaleDetailDto } from './dto/sale-detail.dto';

@Injectable()
export class SaleDetailService {
  create(createSaleDetailDto: SaleDetailDto) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
