import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Asus' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  readonly brand: string;

  @ApiProperty({ example: 'X565' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  readonly name: string;

  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  readonly category: string;

  @ApiProperty({ example: 'Barcelona' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  readonly location: string;

  @ApiProperty({ example: 695.95 })
  @IsNotEmpty()
  readonly price: number;
}
