import { Category } from 'src/models/categories.entity'
import { CategoryRequestDTO } from '../dto/category-request.dto'
import { CategoryResponseDTO } from '../dto/category-response.dto'

export class CategoryMapper {
  static toCategory(data: CategoryRequestDTO): Partial<Category> {
    return {
      name: data.name,
      description: data.description,
    }
  }

  static toCategoryDTO(data: Category): CategoryResponseDTO {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
    }
  }
}
