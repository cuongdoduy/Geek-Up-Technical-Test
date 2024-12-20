import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

class Variant {
  @ApiProperty({ description: 'Color of the variant', example: 'Red' })
  @IsNotEmpty()
  @IsString()
  color: string

  @ApiProperty({
    description: 'Sizes available for this color',
    example: ['S', 'M', 'L'],
  })
  @IsArray()
  @IsString({ each: true }) // Ensures each item in the array is a string
  sizes: string[]
}

export class ProductRequestDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  product_name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  description: string

  @ApiProperty({ type: 'string' })
  category_id: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  cover: string

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  discount: number

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  price: number

  @ApiProperty({
    description: 'Variants of the product',
    type: [Variant],
    example: [
      { color: 'Red', sizes: ['S', 'M', 'L'] },
      { color: 'Blue', sizes: ['M', 'L'] },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => Variant) // Transform items to `Variant` class
  variants: Variant[]

  @ApiProperty({
    type: [String],
    description: 'List of product image URLs',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  product_images: string[];
}
