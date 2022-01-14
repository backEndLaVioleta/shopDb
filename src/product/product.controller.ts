import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  private logger = new Logger('productController');
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/all')
  async findAll() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @Patch('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('/delete/:id')
  async removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
