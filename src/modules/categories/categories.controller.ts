import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import { ResponseHandler } from 'src/types/response'
import { CategoryRequestDTO } from './dto/category-request.dto'
import { CategoryMapper } from './mappers'

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Get all categories',
    description: 'Get all categories.',
  })
  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll()
  }

  @ApiOperation({
    summary: 'Get products by category',
    description: 'Get products by category.',
  })
  @ApiParam({ name: 'id', description: 'Category id' })
  @Get(':id/products')
  async getProductsByCategory(@Res() res, @Param('id') id: string) {
    const products = await this.categoriesService.getProductsByCategory(id)
    const response = ResponseHandler.success(
      products,
      'Products retrieved successfully',
    )
    return res.status(HttpStatus.OK).json(response)
  }

  @ApiOperation({
    summary: 'Create category',
    description: 'Create category.',
  })
  @ApiBody({ type: CategoryRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    schema: {
      example: { id: 1, name: 'Category 1' },
    },
  })
  @Post()
  async createCategories(@Body() categoryDTO: CategoryRequestDTO, @Res() res) {
    const categoryEntity = CategoryMapper.toCategory(categoryDTO)
    const createdCategory = await this.categoriesService.create(categoryEntity)
    const categoryResponseDTO = CategoryMapper.toCategoryDTO(createdCategory)
    const response = ResponseHandler.success(
      categoryResponseDTO,
      'Category created successfully',
    )
    return res.status(HttpStatus.CREATED).json(response)
  }
}
