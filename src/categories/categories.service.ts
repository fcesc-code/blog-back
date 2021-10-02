import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private mapper: CategoryMapper,
  ) {}

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories: CategoryEntity[] =
      await this.categoriesRepository.getAllCategories();
    return categories.map((category) => this.mapper.entityToDto(category));
  }

  async getCategoryById(id: string): Promise<CategoryDto> {
    const category: CategoryEntity =
      await this.categoriesRepository.getCategoryById(id);
    return this.mapper.entityToDto(category);
  }

  async getCategoryByTitle(title: string): Promise<CategoryEntity> {
    return await this.categoriesRepository.getCategoryByTitle(title);
  }

  async getCategoryByColor(css_color: string): Promise<CategoryEntity> {
    return await this.categoriesRepository.getCategoryByColor(css_color);
  }

  async categoryTitleAlreadyExist(category: CategoryDto): Promise<number> {
    return await this.categoriesRepository.categoryTitleAlreadyExist(category);
  }

  async categoryCssColorAlreadyExist(category: CategoryDto): Promise<number> {
    return await this.categoriesRepository.categoryCssColorAlreadyExist(
      category,
    );
  }

  async newCategory(categoryDTO: CategoryDto): Promise<CategoryDto> {
    const newCategory: CategoryEntity =
      await this.categoriesRepository.newCategory(categoryDTO);
    return this.mapper.entityToDto(newCategory);
  }

  async updateCategory(
    id: string,
    categoryDTO: CategoryDto,
  ): Promise<CategoryDto> {
    const updateCategory = await this.categoriesRepository.updateCategory(
      id,
      categoryDTO,
    );
    return this.mapper.entityToDto(updateCategory);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult =
      await this.categoriesRepository.deleteCategory(id);
    return deleteResult;
  }
}
