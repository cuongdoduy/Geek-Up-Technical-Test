import { Product } from 'src/models/products.entity'
import { ProductRequestDTO } from '../dto/product-request.dto'
import { ProductImage } from 'src/models/productimages.entity'
import { ProductResponseDTO } from '../dto/product-response.dto'

export class ProductMapper {
  static toProduct(dto: ProductRequestDTO): Partial<Product> {
    return {
      name: dto.product_name,
      description: dto.description,
      price: dto.price,
      discount: dto.discount,
      cover: dto.cover,
      category_id: dto.category_id,
      variants: dto.variants,
      slug:
        dto.product_name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
    }
  }

  static toProductResponse(
    data: Product | (Product & { images: Array<ProductImage> }),
  ): ProductResponseDTO {

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      cover: data.cover,
      discount: data.discount,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }
}
