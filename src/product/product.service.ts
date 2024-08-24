import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      throw new BadRequestException('Falha ao criar o produto');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`Produto com id ${id} não encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao buscar o produto');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      if (!updatedProduct) {
        throw new NotFoundException(`Produto com id ${id} não encontrado`);
      }
      return updatedProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Produto com id ${id} não encontrado`);
      }
      throw new BadRequestException('Falha ao atualizar o produto');
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Produto com id ${id} não encontrado`);
      }
      throw new BadRequestException('Falha ao deletar o produto');
    }
  }
}
