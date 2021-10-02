import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CategoryDto } from '../category.dto';

@Injectable()
export class ExistCategoryCssColorPipe implements PipeTransform {
  constructor(private categoriesService: CategoriesService) {}
  async transform(value: CategoryDto) {
    const numCssColor: number =
      await this.categoriesService.categoryCssColorAlreadyExist(value);

    if (numCssColor > 0) {
      throw new BadRequestException('Css color value already exists');
    }

    return value;
  }
}
