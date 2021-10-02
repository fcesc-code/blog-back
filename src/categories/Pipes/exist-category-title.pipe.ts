import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CategoryDto } from '../category.dto';

@Injectable()
export class ExistCategoryTitlePipe implements PipeTransform {
  constructor(private categoriesService: CategoriesService) {}
  async transform(value: CategoryDto) {
    const numTitle: number =
      await this.categoriesService.categoryTitleAlreadyExist(value);

    if (numTitle > 0) {
      throw new BadRequestException('Title value already exists');
    }

    return value;
  }
}
