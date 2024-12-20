import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CategoryRequestDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  description: string
}