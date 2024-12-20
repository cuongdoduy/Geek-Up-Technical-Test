import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { Order } from 'src/models/orders.entity'
import { OrdersRepositoryInterface } from 'src/modules/orders/interfaces/orders.interface'

export class OrdersRepository
  extends BaseAbstractRepostitory<Order>
  implements OrdersRepositoryInterface
{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository)
  }
}
