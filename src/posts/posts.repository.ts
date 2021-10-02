import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';
import { PostMapper } from './post.mapper';

export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private mapper: PostMapper,
  ) {}

  getAllPosts(): Promise<PostEntity[]> {
    return this.postsRepository.find({ relations: ['user', 'categories'] });
  }

  getPostById(id: string): Promise<PostEntity> {
    return this.postsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });
  }

  async newPost(postDto: PostDto): Promise<PostEntity> {
    const newPost = await this.mapper.dtoToEntity(postDto);

    return this.postsRepository.save(newPost);
  }

  async updatePost(id: string, postDto: PostDto): Promise<PostEntity> {
    const updatePostDto: PostDto = new PostDto(
      id,
      postDto.title,
      postDto.description,
      postDto.num_likes,
      postDto.num_dislikes,
      postDto.publication_date,
      postDto.userId,
      postDto.userAlias,
      postDto.categories,
    );
    const updatePost = await this.mapper.dtoToEntity(updatePostDto);

    await getConnection()
      .createQueryBuilder()
      .update('posts_categories_categories')
      .delete()
      .where('postsPostId = :postsPostId', { postsPostId: id })
      .execute();

    await this.postsRepository.delete(id);

    return await this.postsRepository.save(updatePost);
    /*
    return this.postsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });*/
  }

  async likePost(id: string): Promise<UpdateResult> {
    const post = await this.postsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });
    const likes = post.num_likes + 1;

    return await getConnection()
      .createQueryBuilder()
      .update('posts')
      .set({ num_likes: likes })
      .where({ postId: id })
      .execute();
  }

  async dislikePost(id: string): Promise<UpdateResult> {
    const post = await this.postsRepository.findOne(id, {
      relations: ['user', 'categories'],
    });

    const dislikes = post.num_dislikes + 1;

    return await getConnection()
      .createQueryBuilder()
      .update('posts')
      .set({ num_dislikes: dislikes })
      .where({ postId: id })
      .execute();
  }

  deletePost(id: string): Promise<DeleteResult> {
    return this.postsRepository.delete(id);
  }
}
