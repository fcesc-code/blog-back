import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/category.dto';

export class PostDto {
  @ApiProperty()
  readonly postId?: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly num_likes: number;

  @ApiProperty()
  readonly num_dislikes: number;

  @ApiProperty()
  readonly publication_date: Date;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly userAlias?: string;

  @ApiProperty()
  readonly categories: CategoryDto[];

  constructor(
    postId: string,
    title: string,
    description: string,
    num_likes: number,
    num_dislikes: number,
    publication_date: Date,
    userId: string,
    userAlias: string,
    categories: CategoryDto[],
  ) {
    this.postId = postId;
    this.title = title;
    this.description = description;
    this.num_likes = num_likes;
    this.num_dislikes = num_dislikes;
    this.publication_date = publication_date;
    this.userId = userId;
    this.userAlias = userAlias;
    this.categories = categories;
  }
}
