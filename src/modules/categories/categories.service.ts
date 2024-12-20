import { Inject, Injectable } from '@nestjs/common'
import { Category } from 'src/models/categories.entity'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { CategoriesRepositoryInterface } from './interfaces/category.interface'
import { ProductsRepositoryInterface } from '../products/interfaces/products.interface'

@Injectable()
export class CategoriesService extends BaseServiceAbstract<Category> {
  constructor(
    @Inject('CategoriesRepositoryInterface')
    private readonly categories_repository: CategoriesRepositoryInterface,
    @Inject('ProductsRepositoryInterface')
    private readonly products_repository: ProductsRepositoryInterface,
  ) {
    super(categories_repository)
  }

  async getProductsByCategory(categoryId: string) {
    return this.products_repository.findAll({
      where: { category_id: categoryId },
    })
  }
}
