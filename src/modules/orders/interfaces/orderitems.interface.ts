import { Order } from 'src/models/orders.entity'
import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'
import { OrderItem } from 'src/models/orderitems.entity'

export interface OrderItemsRepositoryInterface
  extends BaseAbstractRepostitory<OrderItem> {}
