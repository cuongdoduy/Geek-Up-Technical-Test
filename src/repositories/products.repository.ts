import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { Product } from 'src/models/products.entity'
import { ProductsRepositoryInterface } from 'src/modules/products/interfaces/products.interface'

export class ProductsRepository
  extends BaseAbstractRepostitory<Product>
  implements ProductsRepositoryInterface
{
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository)
  }
}
