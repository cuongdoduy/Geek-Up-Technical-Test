import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { CategoriesRepositoryInterface } from 'src/modules/categories/interfaces/category.interface'
import { Category } from 'src/models/categories.entity'

export class CategoriesRepository
  extends BaseAbstractRepostitory<Category>
  implements CategoriesRepositoryInterface
{
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository)
  }
}
