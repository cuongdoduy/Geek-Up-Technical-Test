import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CustomersService } from './users.service'
import { CustomerRequestDTO } from './dto/customer.request.dto'
import { CustomerMapper } from './mappers'
import { ResponseHandler } from 'src/types/response'

@ApiTags('Customers')
@Controller('api/v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({
    summary: 'Get all customers',
    description: 'Get all customers.',
  })
  @Get()
  async getAllCustomers() {
    return this.customersService.findAll()
  }

  @ApiOperation({
    summary: 'Create customer',
    description: 'Create customer.',
  })
  @ApiBody({ type: CustomerRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
    schema: {
      example: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status:  500, description: 'Internal Server Error.' })
  @Post()
  async createCustomers(@Body() customerDTO: CustomerRequestDTO, @Res() res) {
    try {
      const customerEntity = CustomerMapper.toCustomer(customerDTO)
      const createdCustomer = await this.customersService.createNewCustomer(customerEntity)
      const customerResponseDTO = CustomerMapper.toCustomerDTO(createdCustomer)
      const response = ResponseHandler.success(
        customerResponseDTO,
        'Customer created successfully',
      )
      return res.status(HttpStatus.CREATED).json(response)
    } catch (error) {
      const response = ResponseHandler.error(error.message)
      return res.status(HttpStatus.BAD_REQUEST).json(response)
    }
  }
}
