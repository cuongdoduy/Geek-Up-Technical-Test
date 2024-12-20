import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/models/categories.entity'
import { CategoriesRepository } from 'src/repositories/categories.repository'
import { ProductsRepository } from 'src/repositories/products.repository'
import { Product } from 'src/models/products.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [
    CategoriesService,
    {
      provide: 'CategoriesRepositoryInterface',
      useClass: CategoriesRepository,
    },
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductsRepository,
    },
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
