import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  readonly categoryId?: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly css_color: string;

  @ApiProperty()
  readonly userId: string;

  //@ApiProperty()
  //readonly posts: string[];

  constructor(
    categoryId: string,
    title: string,
    description: string,
    css_color: string,
    userId: string,
    //posts: string[],
  ) {
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.css_color = css_color;
    this.userId = userId;
    //  this.posts = posts;
  }
}
