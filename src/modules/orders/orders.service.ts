import { Inject, Injectable } from '@nestjs/common'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { OrdersRepositoryInterface } from './interfaces/orders.interface'
import { Order } from 'src/models/orders.entity'
import { OrderDiscountRepositoryInterface } from './interfaces/orderdiscounts.interface'
import { OrderItemsRepositoryInterface } from './interfaces/orderitems.interface'
import { OrderItem } from 'src/models/orderitems.entity'
import { DataSource } from 'typeorm'
import { Product } from 'src/models/products.entity'
import { Discount } from 'src/models/discount.entity'

@Injectable()
export class OrdersService extends BaseServiceAbstract<Order> {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly ordersRepository: OrdersRepositoryInterface,
    @Inject('OrderItemsRepositoryInterface')
    private readonly orderItemsRepository: OrderItemsRepositoryInterface,
    @Inject('OrderDiscountsRepositoryInterface')
    private readonly orderDiscountsRepository: OrderDiscountRepositoryInterface,
    private readonly dataSource: DataSource,
  ) {
    super(ordersRepository)
  }

  async createNewOrder(
    order: Partial<Order>,
    items: Array<Partial<OrderItem>>,
    discounts: Array<string>,
  ) {
    const res = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder('Product')
      .where('Product.id IN (:...ids)', {
        ids: items.map((item) => item.product_id),
      })  
      .getMany()

    // create map of product id to price
    const priceMap = res.reduce((acc, curr) => {
      acc[curr.id] = curr.price - curr.price * (curr.discount / 100)
      return acc
    }, {})

    // calculate total price
    const total = items.reduce((acc, curr) => {
      return acc + priceMap[curr.product_id] * curr.quantity
    }, 0)

    order.total = total

    const discount =
      discounts.length > 0
        ? await this.dataSource
            .getRepository(Discount)
            .createQueryBuilder('discount')
            .where('discount.code IN (:...ids)', { ids: discounts })
            .getMany()
        : []

    const totalDiscount = discount.reduce((acc, curr) => {
      return acc + curr.value
    }, 0)

    order.total -= totalDiscount

    const data = await this.ordersRepository.save(order)

    const itemsData = items.map((item) => {
      return {
        ...item,
        orderId: data.id,
      }
    })


    await this.orderItemsRepository.saveMany(itemsData)

    const discountData = discount.map((tag) => {
      return {
        order_id: data.id,
        discount_id: tag.id,
      }
    })

    await this.orderDiscountsRepository.saveMany(discountData)

    return data
  }
}
