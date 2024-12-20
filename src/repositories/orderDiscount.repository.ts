import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { Product } from 'src/models/products.entity'
import { OrderDiscount } from 'src/models/orderdiscount.entity'
import { OrderDiscountRepositoryInterface } from 'src/modules/orders/interfaces/orderdiscounts.interface'

export class OrderDiscountRepository
  extends BaseAbstractRepostitory<OrderDiscount>
  implements OrderDiscountRepositoryInterface
{
  constructor(
    @InjectRepository(OrderDiscount)
    private readonly orderDiscountRepository: Repository<OrderDiscount>,
  ) {
    super(orderDiscountRepository)
  }
}
