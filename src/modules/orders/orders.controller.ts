import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { OrdersService } from './orders.service'
import { OrderRequestDTO } from './dto/order-request.dto'
import { OrderMapper } from './mappers'
import { ResponseHandler } from 'src/types/response'

@ApiTags('Orders')
@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Get all orders',
    description: 'Get all orders.',
  })
  @Get()
  async getAllOrders() {
    return this.ordersService.findAll()
  }

  @ApiOperation({
    summary: 'Create order',
    description: 'Create order.',
  })
  @ApiBody({ type: OrderRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  @Post()
  async createOrder(@Body() order: OrderRequestDTO, @Res() res) {
    const orderEntity = OrderMapper.toOrder(order)
    const data = await this.ordersService.createNewOrder(
      orderEntity,
      order.items,
      order.discounts,
    )
    const response = ResponseHandler.success(data, 'Order created successfully')
    return res.status(HttpStatus.CREATED).json(response)
  }
}
