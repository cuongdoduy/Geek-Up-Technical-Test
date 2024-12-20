import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'
import { Category } from "src/models/categories.entity"

export interface CategoriesRepositoryInterface
  extends BaseAbstractRepostitory<Category> {}
