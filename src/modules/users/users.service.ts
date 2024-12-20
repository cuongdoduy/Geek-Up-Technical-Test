import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { Customer } from '../../models/customers.entity'
import { BaseServiceAbstract } from '../../services/base/base.abstract.service'
import { CustomersRepositoryInterface } from './interfaces/users.interface'
import { DeepPartial } from 'typeorm'

@Injectable()
export class CustomersService extends BaseServiceAbstract<Customer> {
  constructor(
    @Inject('CustomersRepositoryInterface')
    private readonly users_repository: CustomersRepositoryInterface,
  ) {
    super(users_repository)
  }

  async createNewCustomer(user: Partial<Customer>): Promise<Customer> {

    // check if user email or username already exists
    const userExists = await this.users_repository.findByCondition({
      where: [{ email: user.email }, { username: user.username }],
    })

    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    return await this.users_repository.save(user)
  }
}
