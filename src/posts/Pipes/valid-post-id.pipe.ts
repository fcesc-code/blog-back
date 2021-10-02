import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class ValidPostIdPipe implements PipeTransform {
  constructor(private postsService: PostsService) {}
  async transform(value: any) {
    try {
      await this.postsService.getPostById(value);
    } catch (err) {
      throw new BadRequestException("Post ID don't exist");
    }
    return value;
  }
}
