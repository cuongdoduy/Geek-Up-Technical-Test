import { Order } from 'src/models/orders.entity'
import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'

export interface OrdersRepositoryInterface
  extends BaseAbstractRepostitory<Order> {}
