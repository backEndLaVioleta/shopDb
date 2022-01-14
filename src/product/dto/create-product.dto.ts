import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: '007' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'Asus' })
  @IsString()
  @Length(4, 50)
  readonly brand: string;

  @ApiProperty({ example: 'X565' })
  @IsString()
  @Length(4, 50)
  readonly name: string;

  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @Length(4, 50)
  readonly category: string;

  @ApiProperty({ example: 'Barcelona' })
  @IsString()
  @Length(4, 50)
  readonly location: string;

  @ApiProperty({ example: 695.95 })
  @IsInt()
  readonly price: number;
}
