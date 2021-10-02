import { UserEntity } from 'src/users/user.entity';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';

export class CategoryMapper {
  async dtoToEntity(categoryDTO: CategoryDto): Promise<CategoryEntity> {
    const userAssociatedEntity = await UserEntity.findOne(categoryDTO.userId);
    /*
    const postsAssociated: PostEntity[] = new Array<PostEntity>();

    if (categoryDTO.posts) {
      for (let i = 0; i < categoryDTO.posts.length; i++) {
        const post = await PostEntity.findOne(categoryDTO.posts[i]);
        postsAssociated.push(post);
      }
    }
*/
    return new CategoryEntity(
      categoryDTO.categoryId,
      categoryDTO.title,
      categoryDTO.description,
      categoryDTO.css_color,
      userAssociatedEntity,
      // postsAssociated,
    );
  }

  entityToDto(categoryEntity: CategoryEntity): CategoryDto {
    /*
    const postsIds: string[] = new Array<string>();

    for (let i = 0; i < categoryEntity.posts.length; i++) {
      const postId = categoryEntity.posts[i].postId;
      postsIds.push(postId);
    }
*/
    return new CategoryDto(
      categoryEntity.categoryId,
      categoryEntity.title,
      categoryEntity.description,
      categoryEntity.css_color,
      categoryEntity.user.userId,
      //    postsIds,
    );
  }
}
