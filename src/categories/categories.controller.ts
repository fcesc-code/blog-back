import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { ExistCategoryCssColorPipe } from './Pipes/exist-category-css-color.pipe';
import { ExistCategoryTitlePipe } from './Pipes/exist-category-title.pipe';
import { ValidCategoryIdPipe } from './Pipes/valid-category-id.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getAllCategories(): Promise<CategoryDto[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getCategoryById(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<CategoryDto> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistCategoryTitlePipe, ExistCategoryCssColorPipe)
  async newCategory(@Body() category: CategoryDto): Promise<CategoryDto> {
    return await this.categoriesService.newCategory(category);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistCategoryTitlePipe, ExistCategoryCssColorPipe)
  async updateCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
    @Body() category: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.categoriesService.deleteCategory(id);
  }
}
