import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Customer } from '../models/customers.entity'
import { Repository } from 'typeorm'
import { CustomersRepositoryInterface } from '../modules/users/interfaces/users.interface'

export class CustomersRepository
  extends BaseAbstractRepostitory<Customer>
  implements CustomersRepositoryInterface
{
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {
    super(customerRepository)
  }
}
