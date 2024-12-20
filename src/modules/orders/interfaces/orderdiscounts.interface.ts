import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'
import { OrderDiscount } from 'src/models/orderdiscount.entity'

export interface OrderDiscountRepositoryInterface
  extends BaseAbstractRepostitory<OrderDiscount> {}
