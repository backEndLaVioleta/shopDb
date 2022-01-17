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
    const checkIfProductExists = await this.productRepository.findOne({
      name: newProduct.name,
      brand: newProduct.brand,
    });
    console.log(checkIfProductExists);
    if (checkIfProductExists) {
      throw new HttpException('Product already in database', HttpStatus.FOUND);
    } else {
      try {
        return await this.productRepository.save(newProduct);
      } catch (error) {
        throw new HttpException(
          'Problem adding product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
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
