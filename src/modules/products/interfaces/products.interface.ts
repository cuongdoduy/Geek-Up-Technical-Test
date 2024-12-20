import { Product } from "src/models/products.entity"
import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'

export interface ProductsRepositoryInterface
  extends BaseAbstractRepostitory<Product> {}
