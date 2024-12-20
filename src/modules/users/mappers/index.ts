import { Customer } from 'src/models/customers.entity'
import { CustomerRequestDTO } from '../dto/customer.request.dto'
import { CustomerResponseDTO } from '../dto/customer.response.dto'
import { PasswordUtils } from 'src/utils/passwordUtils'



export class CustomerMapper {
  static toCustomer(dto: CustomerRequestDTO): Partial<Customer> {
    return {
      username: dto.username,
      email: dto.email,
      password: PasswordUtils.hashPassword(dto.password),
      role: 'customer',
    }
  }

  static toCustomerDTO(entity: Customer): CustomerResponseDTO {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
