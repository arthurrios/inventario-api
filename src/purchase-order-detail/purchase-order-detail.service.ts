import { Injectable } from '@nestjs/common';

import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { PurchaseOrderDetailDto } from './dto/purchase-order-detail.dto';

@Injectable()
export class PurchaseOrderDetailService {
  create(createPurchaseOrderDetailDto: PurchaseOrderDetailDto) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
