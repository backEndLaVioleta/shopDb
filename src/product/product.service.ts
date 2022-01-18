import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isString } from 'class-validator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      console.log(`This action returns all product`);
      return await this.productRepository.find();
    } catch (error) {
      throw new HttpException('List not available.', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneProduct(id: string): Promise<Product> {
    console.log(`This action returns a #${id} product`);
    try {
      const productToFind = await this.productRepository.findOne(id);
      console.log(productToFind);
      if (!productToFind) {
        throw new NotFoundException('Product not found');
      }
      return productToFind;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async findOneProductByName(
    productName: string,
    productBrand: string,
  ): Promise<Product> {
    if (isString(productName && productBrand)) {
      const productToFind = await this.productRepository.findOne({
        name: productName,
        brand: productBrand,
      });
      if (!productToFind) {
        throw new NotFoundException('Product not found');
      }
      return productToFind;
    } else {
      throw new HttpException('Not proper name format', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    console.log(`This action updates a #${id} product`);
    try {
      const productToUpdate = await this.productRepository.findOne(id);
      if (!productToUpdate) {
        throw new NotFoundException('Product not found');
      }

      Object.assign(productToUpdate, updateProductDto);

      return await this.productRepository.save(productToUpdate);
    } catch (error) {
      throw new HttpException(
        'Not proper idetification format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeProduct(id: string): Promise<Product> {
    console.log(`This action removes a #${id} product`);
    try {
      const productToDelete = await this.productRepository.findOne(id);
      if (!productToDelete) {
        throw new NotFoundException('Product not found');
      }
      this.productRepository.remove(productToDelete);
      return productToDelete;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
