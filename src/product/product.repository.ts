import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  // methoods
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { brand, name, category, location, price } = createProductDto;

    const product = new Product();
    product.productId = uuid();
    product.brand = brand;
    product.name = name;
    product.category = category;
    product.location = location;
    product.price = price;

    // check name and brand
    const checkIfProductExists = await this.find({
      name: name,
      brand: brand,
    });
    console.log(checkIfProductExists);
    if (checkIfProductExists.length) {
      throw new ConflictException({
        statusCode: 409,
        message: 'product already in database',
      });
    }
    if (!checkIfProductExists.length) {
      try {
        return await this.save(product);
      } catch (error) {
        throw new HttpException(
          'Problem adding product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
