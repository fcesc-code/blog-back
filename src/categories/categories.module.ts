import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './category.entity';
import { CategoryMapper } from './category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoryMapper, CategoriesRepository, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
