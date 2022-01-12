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
  @ObjectIdColumn() id: ObjectID;
  @Column() productId: string = uuidv4();
  @Column() productname: string;
  @Column() category: string;
  @Column() location: string;
  @Column() price: number;
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
