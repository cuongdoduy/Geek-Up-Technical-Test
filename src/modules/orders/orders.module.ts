import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/models/products.entity'
import { Order } from 'src/models/orders.entity'
import { OrderItem } from 'src/models/orderitems.entity'
import { Discount } from 'src/models/discount.entity'
import { OrderDiscount } from 'src/models/orderdiscount.entity'
import { OrdersRepository } from 'src/repositories/orders.repository'
import { OrderItemsRepository } from 'src/repositories/orderItems.repository'
import { OrderDiscountRepository } from 'src/repositories/orderDiscount.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Order,
      OrderItem,
      Discount,
      OrderDiscount,
    ]),
  ],
  providers: [
    OrdersService,
    {
      provide: 'OrdersRepositoryInterface',
      useClass: OrdersRepository,
    },
    {
      provide: 'OrderItemsRepositoryInterface',
      useClass: OrderItemsRepository,
    },
    {
      provide: 'OrderDiscountsRepositoryInterface',
      useClass: OrderDiscountRepository,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
