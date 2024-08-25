import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });
      return category;
    } catch (error) {
      throw new BadRequestException('Falha ao criar categoria');
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new BadRequestException('Falha ao buscar categorias');
    }
  }

  async findOne(category_id: string): Promise<Category> {
    try {
      const category = await this.prisma.category.findUnique({ where: { category_id } });
      if (!category) {
        throw new NotFoundException(`Categoria com id ${category_id} não encontrada`);
      }
      return category;
    } catch (error) {
      throw new NotFoundException(`Categoria com id ${category_id} não encontrada`);
    }
  }

  async update(category_id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.prisma.category.update({
        where: { category_id },
        data: updateCategoryDto,
      });
      if (!category) {
        throw new NotFoundException(`Categoria com id ${category_id} não encontrada`);
      }
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Categoria com id ${category_id} não encontrada`);
      }
      throw new BadRequestException('Falha ao atualizar categoria');
    }
  }

  async remove(category_id: string): Promise<Category> {
    try {
      const category = await this.prisma.category.delete({
        where: { category_id },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Categoria com id ${category_id} não encontrada`);
      }
      throw new BadRequestException('Falha ao deletar categoria');
    }
  }
}
