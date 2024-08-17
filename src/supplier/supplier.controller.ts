import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';;
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SupplierEntity } from './entities/supplier.entity';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  @UseGuards(GoogleOAuthGuard)
  @ApiCreatedResponse({ type: SupplierEntity })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SupplierEntity, isArray: true })
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SupplierEntity, isArray: true })
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SupplierEntity })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @UseGuards(GoogleOAuthGuard)
  @ApiOkResponse({ type: SupplierEntity })
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
