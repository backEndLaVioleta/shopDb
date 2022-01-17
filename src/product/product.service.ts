import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isString } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, createProductDto);
    console.log('This action adds a new product');
    try {
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAllProducts() {
    try {
      console.log(`This action returns all product`);
      return await this.productRepository.find();
    } catch (error) {
      throw new HttpException('List not available.', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneProduct(id: string) {
    console.log(`This action returns a #${id} product`);
    const productToFind = await this.productRepository.findOne({ id: id });
    console.log(productToFind);
    if (!productToFind) {
      throw new NotFoundException('Product not found');
    }
    return await productToFind;
  }

  async findOneProductByName(productName: string) {
    if (isString(productName)) {
      const productToFind = await this.productRepository.findOne({
        name: productName,
      });
      if (!productToFind) {
        throw new NotFoundException('Product not found');
      }
      return await productToFind;
    } else {
      throw new HttpException('Not proper name format', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    console.log(`This action updates a #${id} product`);

    const productToUpdate = await this.productRepository.findOne({ id });
    if (!productToUpdate) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(productToUpdate, updateProductDto);

    return await this.productRepository.save(productToUpdate);
  }

  async removeProduct(id: string) {
    console.log(`This action removes a #${id} product`);
    const productToDelete = await this.productRepository.findOne({ id });
    if (!productToDelete) {
      throw new NotFoundException('Product not found');
    }
    this.productRepository.remove(productToDelete);

    return await productToDelete;
  }
}
