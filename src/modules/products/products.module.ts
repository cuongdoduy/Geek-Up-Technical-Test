import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/models/products.entity'
import { ProductsService } from './products.service'
import { ProductsRepository } from 'src/repositories/products.repository'
import { ProductImagesRepository } from 'src/repositories/productImages.repository'
import { ProductImage } from 'src/models/productimages.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductsRepository,
    },
    {
      provide: 'ProductImagesRepositoryInterface',
      useClass: ProductImagesRepository,
    },
    ProductsService,
  ],
})
export class ProductsModule {}
