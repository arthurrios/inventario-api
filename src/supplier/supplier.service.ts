import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) { }
  
  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await this.prisma.supplier.create({
      data: createSupplierDto,
    });
    return supplier;
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }

  findOne(id: string) {
    return this.prisma.supplier.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const { id: supplierId, ...data } = updateSupplierDto;
    return this.prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.supplier.delete({
      where: {
        id: id,
      },
    });
  }
}
