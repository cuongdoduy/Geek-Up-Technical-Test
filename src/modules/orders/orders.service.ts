import { Inject, Injectable } from '@nestjs/common'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { OrdersRepositoryInterface } from './interfaces/orders.interface'
import { Order } from 'src/models/orders.entity'
import { OrderDiscountRepositoryInterface } from './interfaces/orderdiscounts.interface'
import { OrderItemsRepositoryInterface } from './interfaces/orderitems.interface'

@Injectable()
export class OrdersService extends BaseServiceAbstract<Order> {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly ordersRepository: OrdersRepositoryInterface,
    @Inject('OrderItemsRepositoryInterface')
    private readonly orderItemsRepository: OrderItemsRepositoryInterface,
    @Inject('OrderDiscountsRepositoryInterface')
    private readonly orderDiscountsRepository: OrderDiscountRepositoryInterface,
  ) {
    super(ordersRepository)
  }
}
