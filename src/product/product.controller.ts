import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  // //@UseGuards(GoogleOAuthGuard)
  ////@UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  // //@UseGuards(GoogleOAuthGuard)
  ////@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  // //@UseGuards(GoogleOAuthGuard)
  ////@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  // //@UseGuards(GoogleOAuthGuard)
  ////@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  // //@UseGuards(GoogleOAuthGuard)
  ////@UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
