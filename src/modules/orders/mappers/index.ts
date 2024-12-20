import { OrderRequestDTO } from '../dto/order-request.dto'
import { Order } from 'src/models/orders.entity'

export class OrderMapper {
  static toOrder(dto: OrderRequestDTO): Partial<Order> {
    return {
      customer_id: dto.customer_id,
      fullName: dto.full_name,
      province: dto.province,
      district: dto.district,
      commune: dto.commune,
      address: dto.address,
      phoneNumber: dto.phone_number,
      emailAddress: dto.email,
      housingType: dto.housing_type
    }
  }
}
