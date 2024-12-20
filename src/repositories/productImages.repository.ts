import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { Repository } from 'typeorm'
import { ProductsRepositoryInterface } from 'src/modules/products/interfaces/products.interface'
import { ProductImage } from 'src/models/productimages.entity'
import { ProductImagesRepositoryInterface } from 'src/modules/products/interfaces/productImages.interface'

export class ProductImagesRepository
  extends BaseAbstractRepostitory<ProductImage>
  implements ProductImagesRepositoryInterface
{
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
  ) {
    super(productImagesRepository)
  }
}
