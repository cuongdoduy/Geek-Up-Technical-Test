import { Customer } from '../../../models/customers.entity'
import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'

export interface CustomersRepositoryInterface
  extends BaseAbstractRepostitory<Customer> {}
