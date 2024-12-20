import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { Product } from 'src/models/products.entity'
import { Order } from 'src/models/orders.entity'
import { OrdersRepositoryInterface } from 'src/modules/orders/interfaces/orders.interface'
import { OrderItemsRepositoryInterface } from 'src/modules/orders/interfaces/orderitems.interface'
import { OrderItem } from 'src/models/orderitems.entity'

export class OrderItemsRepository
  extends BaseAbstractRepostitory<OrderItem>
  implements OrderItemsRepositoryInterface
{
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {
    super(orderItemsRepository)
  }
}
