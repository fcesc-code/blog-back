import { CategoryDto } from 'src/categories/category.dto';
import { CategoryEntity } from 'src/categories/category.entity';
import { UserEntity } from 'src/users/user.entity';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';

export class PostMapper {
  async dtoToEntity(postDto: PostDto): Promise<PostEntity> {
    const userAssociatedEntity = await UserEntity.findOne(postDto.userId);

    const categoriesAssociated: CategoryEntity[] = new Array<CategoryEntity>();

    if (postDto.categories) {
      for (let i = 0; i < postDto.categories.length; i++) {
        const category = await CategoryEntity.findOne(postDto.categories[i]);
        categoriesAssociated.push(category);
      }
    }

    return new PostEntity(
      postDto.postId,
      postDto.title,
      postDto.description,
      postDto.num_likes,
      postDto.num_dislikes,
      postDto.publication_date,
      userAssociatedEntity,
      categoriesAssociated,
    );
  }

  entityToDto(postEntity: PostEntity): PostDto {
    const categories: CategoryDto[] = new Array<CategoryDto>();

    for (let i = 0; i < postEntity.categories.length; i++) {
      const category = new CategoryDto(
        postEntity.categories[i].categoryId,
        postEntity.categories[i].title,
        postEntity.categories[i].description,
        postEntity.categories[i].css_color,
        postEntity.user.userId,
        //    postsIds,
      );

      categories.push(category);
    }

    return new PostDto(
      postEntity.postId,
      postEntity.title,
      postEntity.description,
      postEntity.num_likes,
      postEntity.num_dislikes,
      postEntity.publication_date,
      postEntity.user.userId,
      postEntity.user.alias,
      categories,
    );
  }
}
