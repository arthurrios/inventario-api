import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Supplier } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.create({
        data,
      });
      return supplier;
    } catch (error) {
      throw new BadRequestException('Falha ao criar o fornecedor');
    }
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
    }

    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    try {
      const updatedSupplier = await this.prisma.supplier.update({
        where: { id },
        data: updateSupplierDto,
      });

      if (!updatedSupplier) {
        throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
      }

      return updatedSupplier;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
        }
      }
      throw new BadRequestException('Falha ao atualizar o fornecedor');
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.delete({
        where: { id },
      });

      if (!supplier) {
        throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
      }

      return supplier;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
        }
      }
      throw new BadRequestException('Falha ao remover o fornecedor');
    }
  }
}
