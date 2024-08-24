import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    const product = this.prisma.product.create({
      data: createProductDto,
    });

    return product
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = this.prisma.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });

    return updatedProduct;
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
