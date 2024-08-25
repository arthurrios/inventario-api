import { PartialType } from '@nestjs/mapped-types';
import { SaleDetailDto } from './sale-detail.dto';

export class UpdateSaleDetailDto extends PartialType(SaleDetailDto) { }
