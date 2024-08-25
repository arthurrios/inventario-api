import { Injectable } from '@nestjs/common';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Sale, Prisma } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.SaleCreateInput): Promise<Sale> {
    return this.prisma.sale.create({
      data,
      include: { SaleDetails: true },
    });
  }

  async findAll(): Promise<Sale[]> {
    return this.prisma.sale.findMany({ include: { SaleDetails: true } });
  }

  async findOne(sale_id: string): Promise<Sale | null> {
    return this.prisma.sale.findUnique({
      where: { sale_id },
      include: { SaleDetails: true },
    });
  }

  async update(sale_id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const data: Prisma.SaleUpdateInput = {
      ...updateSaleDto,
      SaleDetails: updateSaleDto.saleDetails
        ? {
          update: updateSaleDto.saleDetails.map(item => ({
            where: { sale_detail_id: item.sale_detail_id },
            data: {
              quantity: item.quantity,
              unit_price: item.unit_price
            },
          })),
        }
        : undefined,
    };

    return this.prisma.sale.update({
      where: { sale_id },
      data,
      include: { SaleDetails: true },
    });
  }

  async remove(sale_id: string): Promise<Sale> {
    return this.prisma.sale.delete({
      where: { sale_id },
    });
  }

}
