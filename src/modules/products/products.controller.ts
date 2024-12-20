import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { ProductRequestDTO } from './dto/product-request.dto'
import { ProductMapper } from './mappers'
import { ResponseHandler } from 'src/types/response'

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products.',
  })
  @Get()
  async getAllProducts() {
    return this.productsService.findAll()
  }

  @ApiOperation({
    summary: 'Search products by name',
    description: 'Search products by name.',
  })
  @ApiQuery({ name: 'search', type: String })
  @Get('search')
  async searchProducts(@Res() res, @Query('search') search: string) {
    const products = await this.productsService.searchProducts(search)
    const productDtos = products.map((product) =>
      ProductMapper.toProductResponse(product),
    )
    const response = ResponseHandler.success(
      productDtos,
      'Products retrieved successfully',
    )
    return res.status(HttpStatus.OK).json(response)
  }

  @ApiOperation({
    summary: 'Create product',
    description: 'Create product.',
  })
  @ApiBody({ type: ProductRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    schema: {
      example: { id: 1, name: 'Product 1', price: 100 },
    },
  })
  @Post()
  async createProducts(@Body() productDTO: ProductRequestDTO, @Res() res) {
    const productEntity = ProductMapper.toProduct(productDTO)
    const productImages = productDTO.product_images || []
    const createdProductAndImages = await this.productsService.createNewProduct(
      productEntity,
      productImages,
    )
    const productAndImagesResponseDTO = ProductMapper.toProductResponse(
      createdProductAndImages,
    )
    const response = ResponseHandler.success(
      productAndImagesResponseDTO,
      'Product created successfully',
    )
    return res.status(HttpStatus.CREATED).json(response)
  }
}
