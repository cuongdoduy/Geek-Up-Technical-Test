import { BaseAbstractRepostitory } from '../../../repositories/base/base.abstract.repository'
import { ProductImage } from 'src/models/productimages.entity'

export interface ProductImagesRepositoryInterface
  extends BaseAbstractRepostitory<ProductImage> {}
