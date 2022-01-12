import { ApiProperty } from '@nestjs/swagger';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Product {
  @ApiProperty({ example: 'e99' })
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty({ example: 'e99' })
  @Column()
  productId: string = uuidv4();

  @ApiProperty({ example: 'Ram Memory' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Electronics' })
  @Column()
  category: string;

  @ApiProperty({ example: 'Barcelona' })
  @Column()
  location: string;

  @ApiProperty({ example: 95.95 })
  @Column()
  price: number;
  // TODO when creating user, remember arr for products

  @AfterInsert()
  logInsert() {
    console.log(
      'Inserted Product with MongoId',
      this.id,
      'and productId',
      this.productId,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      'Updated Product with MongoId',
      this.id,
      'and productId',
      this.productId,
    );
  }

  @AfterRemove()
  logDelete() {
    console.log(
      'Deleted Product with MongoId',
      this.id,
      'and productId',
      this.productId,
    );
  }
}
