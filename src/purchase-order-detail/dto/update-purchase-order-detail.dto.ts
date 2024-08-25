import { PartialType } from '@nestjs/mapped-types';
import { PurchaseOrderDetailDto } from './purchase-order-detail.dto';

export class UpdatePurchaseOrderDetailDto extends PartialType(PurchaseOrderDetailDto) { }
