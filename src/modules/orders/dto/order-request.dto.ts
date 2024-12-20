import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

class OrderItem {
  @ApiProperty({ description: 'Color of the variant', example: 'Red' })
  @IsNotEmpty()
  @IsString()
  color: string

  @ApiProperty({
    description: 'Sizes available for this color',
    example: 'S',
  })
  @IsString() // Ensures each item in the array is a string
  size: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  product_id: string

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  quantity: number
}

export class ProductRequestDTO {
  @ApiProperty({ type: 'string' })
  customer_id: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  province: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  district: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  commune: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  address: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  full_name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  phone_number: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  email: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  housing_type: 'Company' | 'PersonalHouse'

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  cover: string
  
  @ApiProperty({
    description: 'Order items',
    type: [OrderItem],
    example: [
      { color: 'Red', size: 'S', product_id: '123', quantity: 2 },
      { color: 'Blue', size: 'M', product_id: '456', quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => OrderItem) // Transform items to `Variant` class
  items: OrderItem[]

  @ApiProperty({
    type: [String],
    description: 'List of discount codes',
    example: ['ABC123', 'DEF456'],
  })
  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  discounts: string[]
}
