import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CustomerRequestDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  email: string
}