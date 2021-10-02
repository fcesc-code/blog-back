import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';
import { PostMapper } from './post.mapper';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private mapper: PostMapper,
  ) {}

  async getAllPosts(): Promise<PostDto[]> {
    const posts: PostEntity[] = await this.postsRepository.getAllPosts();
    return posts.map((post) => this.mapper.entityToDto(post));
  }

  async getPostById(id: string): Promise<PostDto> {
    const post: PostEntity = await this.postsRepository.getPostById(id);
    return this.mapper.entityToDto(post);
  }

  async newPost(postDTO: PostDto): Promise<PostDto> {
    const newPost: PostEntity = await this.postsRepository.newPost(postDTO);
    return this.mapper.entityToDto(newPost);
  }

  async updatePost(id: string, postDTO: PostDto): Promise<PostDto> {
    const updatePost = await this.postsRepository.updatePost(id, postDTO);
    return this.mapper.entityToDto(updatePost);
  }

  async likePost(id: string): Promise<UpdateResult> {
    const updatePost = await this.postsRepository.likePost(id);
    return updatePost;
  }

  async dislikePost(id: string): Promise<UpdateResult> {
    const updatePost = await this.postsRepository.dislikePost(id);
    return updatePost;
  }

  async deletePost(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult = await this.postsRepository.deletePost(
      id,
    );
    return deleteResult;
  }
}
