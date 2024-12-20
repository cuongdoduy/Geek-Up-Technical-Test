import { Test, TestingModule } from '@nestjs/testing'
import { CustomersController } from './users.controller'

describe('UsersController', () => {
  let controller: CustomersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
    }).compile()

    controller = module.get<CustomersController>(CustomersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
