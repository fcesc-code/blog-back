import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ValidPostIdPipe } from './Pipes/valid-post-id.pipe';
import { PostDto } from './post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostDto[]> {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  async getPostById(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<PostDto> {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async newPost(@Body() post: PostDto): Promise<PostDto> {
    return await this.postsService.newPost(post);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async updatePost(
    @Param('id', ValidPostIdPipe) id: string,
    @Body() post: PostDto,
  ): Promise<PostDto> {
    return await this.postsService.updatePost(id, post);
  }

  @Put('like/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async likePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<UpdateResult> {
    return await this.postsService.likePost(id);
  }

  @Put('dislike/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async dislikePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<UpdateResult> {
    return await this.postsService.dislikePost(id);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(
    @Param('id', ValidPostIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.postsService.deletePost(id);
  }
}
