import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';   

import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  getSchemaPath,
  ApiBody, // Add this line
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
@ApiTags('Produto') 
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  //@UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      'Exemplo de corpo da requisição': {
        value: {
          code: "",
          product_name: "Novo Smartphone", 
          description: "Um smartphone incrível com câmera de alta resolução.", 
          unit_price: 1299.99, 
          unit_of_measure: "UN",
          category_id: "5739b60a-6e00-4245-a25f-5c2a88ecbb6e",
          quantity_in_stock: 50, 
        }
      }
    }
  })
  @ApiCreatedResponse({
    schema: {
      $ref: getSchemaPath(ProductEntity), 
      example: { 
        code: "000011",
        product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b", // Assuming this is generated on the backend
        product_name: "Novo Smartphone", // At least 3 characters
        description: "Um smartphone incrível com câmera de alta resolução.", // At least 10 characters (optional)
        unit_price: 1299.99, // Positive number
        unit_of_measure: "UN",
        category_id: "5739b60a-6e00-4245-a25f-5c2a88ecbb6e",
        quantity_in_stock: 50, // Positive number
        // created_at and updated_at will likely be generated on the backend
      },
    }
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

 
  @Put(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Atualiza um produto pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    example: 'f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b', 
  })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      'Exemplo de corpo da requisição': {
        value: {
          product_name: "Faca de churrasco", 
          description: "Uma faca bem afiada para churrasco.", 
          unit_price: 75.00, 
          quantity_in_stock: 25,
        }
      }
    }
  })
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(ProductEntity), 
      example: { 
          product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b",
          product_name: "Faca de churrasco", 
          description: "Uma faca bem afiada",
          unit_price: "75.00", 
      },
    }
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')   

  //@UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Exclui um produto pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    example: 'f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b', 
  }) 
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(ProductEntity), 
      example: { 
          product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b",
          product_name: "Faca de cozinha",
          description: "Uma faca bem afiada",
          unit_price: "71.68",
      },
    }
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Obtém produtos por ID de categoria' })
  @ApiParam({ name: 'categoryId', description: 'ID da categoria', example: '5739b60a-6e00-4245-a25f-5c2a88ecbb6e' }) 
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity),
        example: {
          product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b",
          product_name: "Faca de cozinha",
          description: "Uma faca bem afiada",
          unit_price: "71.68",
        },
      },
    },
  })
  async findByCategory(@Param('categoryId') categoryId: string) {
    try {
      return await this.productService.findAllByCategory(categoryId);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos por categoria'); 
    }
  }

  @Get('price')
  @ApiOperation({ summary: 'Obtém produtos por faixa de preço' })
  @ApiQuery({ name: 'min_price', description: 'Preço mínimo', example: 10 })
  @ApiQuery({ name: 'max_price', description: 'Preço máximo', example: 100 })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity),
        example: {
          product_id: "e2a859ca-3fec-4c8a-8ce8-0f8c13712038",
          product_name: "Camiseta",
          description: "Camiseta muito boa",
          unit_price: "35.68",
        },
      },
    },
  })
  async findByPrice(
    @Query('min_price') minPrice: number,
    @Query('max_price') maxPrice: number
  ) {
    try {
      return await this.productService.finAllByPrice(minPrice, maxPrice);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos por preço'); 
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca produtos por nome ou descrição' })
  @ApiQuery({ name: 'search', description: 'Termo de busca', example: 'smartphone' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity),
        example: {
          product_id: "6f7eead1-de7f-4ab8-8bfe-c8840431959c",
          product_name: "Controle",
          description: "Controle de videogame muito bom",
          unit_price: "81.71",
        },
      },
    }
  })
  async findBySearch(@Query('search') search: string) {
    try {
      return await this.productService.findProductsBySearch(search);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos'); 
    }
  }

  @Get('search/category/:categoryId')
  @ApiOperation({ summary: 'Busca produtos por nome/descrição e categoria' })
  @ApiQuery({ name: 'search', description: 'Termo de busca', example: 'smartphone' })
  @ApiParam({ name: 'categoryId', description: 'ID da categoria', example: 'eletronicos' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity),
        example: {
          product_id: "6f7eead1-de7f-4ab8-8bfe-c8840431959c", // Assuming this product matches the search and category
          product_name: "Controle",
          description: "Controle de videogame muito bom",
          unit_price: "81.71",
        },
      },
    }
  })
  async findBySearchAndCategory(
    @Query('search') search: string,
    @Param('categoryId') categoryId: string
  ) {
    try {
      return await this.productService.findProductsBySearchAndCategory(
        search,
        categoryId
      );
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos por categoria'); 
    }
  }

  @Get('search/price')
  @ApiOperation({ summary: 'Busca produtos por nome/descrição e faixa de preço' })
  @ApiQuery({ name: 'search', description: 'Termo de busca', example: 'smartphone' })
  @ApiQuery({ name: 'min_price', description: 'Preço mínimo', example: 500 })
  @ApiQuery({ name: 'max_price', description: 'Preço máximo', example: 2000 })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity),
        example: {
          // ... products matching the search and price range
        }
      }
    }
  })
  async findBySearchAndPrice(
    @Query('search') search: string,
    @Query('min_price') minPrice: number,
    @Query('max_price') maxPrice: number
  ) {
    try {
      return await this.productService.findProductsBySearchAndPrice(
        search,
        minPrice,
        maxPrice
      );
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos por preço'); 
    }
  }

  @Get()
  //@UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Obtém todos os produtos' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductEntity), 
        example: {
          product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b",
          product_name: "Faca de cozinha",
          description: "Uma faca bem afiada",
          unit_price: "71.68",
        },
      },
    },
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  //@UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Obtém um produto pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    example: 'f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b', 
  }) 
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(ProductEntity), 
      example: { 
          product_id: "f1b3b3b4-1b3b-4b3b-8b3b-6b3b3b3b3b3b",
          product_name: "Faca de cozinha",
          description: "Uma faca bem afiada",
          unit_price: "71.68",
      },
    }
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

}