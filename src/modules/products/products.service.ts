import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { Product } from 'src/models/products.entity'
import { BaseServiceAbstract } from '../../services/base/base.abstract.service'
import { ProductsRepositoryInterface } from './interfaces/products.interface'
import { ProductRequestDTO } from './dto/product-request.dto'
import { ProductImagesRepositoryInterface } from './interfaces/productImages.interface'
import { ProductImage } from 'src/models/productimages.entity'
import { DataSource } from 'typeorm'

@Injectable()
export class ProductsService extends BaseServiceAbstract<Product> {
  constructor(
    @Inject('ProductsRepositoryInterface')
    private readonly products_repository: ProductsRepositoryInterface,
    @Inject('ProductImagesRepositoryInterface')
    private readonly productImagesRepository: ProductImagesRepositoryInterface,
    private readonly dataSource: DataSource,
  ) {
    super(products_repository)
  }

  async createNewProduct(
    product: Partial<Product>,
    images: Array<string>,
  ): Promise<Product | (Product & { images: Array<ProductImage> })> {
    const data = await this.products_repository.save(product)

    if (images.length > 0) {
      const imagesData = images.map((image) => {
        return {
          product_id: data.id,
          imageUrl: image,
        }
      })

      const imagesEntity = await this.productImagesRepository.saveMany(
        imagesData,
      )

      return { ...data, images: imagesEntity }
    }

    return data
  }

  async searchProducts(query: string) {
    if (!query) {
      throw new BadRequestException('Query is required')
    }

    const products = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder('Product')
      .where('UNACCENT(LOWER(Product.name)) ILIKE UNACCENT(:query)', {
        query: `%${query.toLowerCase()}%`,
      })
      .getMany()

    return products
  }
}
