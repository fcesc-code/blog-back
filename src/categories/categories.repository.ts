import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryMapper } from './category.mapper';

export class CategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    private mapper: CategoryMapper,
  ) {}

  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.find({ relations: ['user', 'posts'] });
  }

  getCategoryById(id: string): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(id, {
      relations: ['user'],
    });
  }

  getCategoryByTitle(title: string): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(
      { title },
      { relations: ['user'] },
    );
  }

  getCategoryByColor(css_color: string): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(
      { css_color },
      { relations: ['user'] },
    );
  }

  categoryTitleAlreadyExist(category: CategoryDto): Promise<number> {
    return this.categoriesRepository.count({
      where: { title: category.title, categoryId: Not(category.categoryId) },
    });
  }

  categoryCssColorAlreadyExist(category: CategoryDto): Promise<number> {
    return this.categoriesRepository.count({
      where: {
        css_color: category.css_color,
        categoryId: Not(category.categoryId),
      },
    });
  }

  async newCategory(categoryDTO: CategoryDto): Promise<CategoryEntity> {
    const newCategory = await this.mapper.dtoToEntity(categoryDTO);
    return this.categoriesRepository.save(newCategory);
  }

  async updateCategory(
    id: string,
    categoryDTO: CategoryDto,
  ): Promise<CategoryEntity> {
    const updateCategoryDTO: CategoryDto = new CategoryDto(
      id,
      categoryDTO.title,
      categoryDTO.description,
      categoryDTO.css_color,
      categoryDTO.userId,
      //categoryDTO.posts,
    );
    const updateCategory = await this.mapper.dtoToEntity(updateCategoryDTO);
    await this.categoriesRepository.update(id, updateCategory);
    return this.categoriesRepository.findOne(id, {
      relations: ['user'],
    });
  }

  deleteCategory(id: string): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }
}
