import { Module } from '@nestjs/common'
import { CustomersController } from './users.controller'
import { CustomersService } from './users.service'
import { CustomersRepository } from '../../repositories/customers.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from '../../models/customers.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: 'CustomersRepositoryInterface',
      useClass: CustomersRepository,
    },
  ],
})
export class UsersModule {}
