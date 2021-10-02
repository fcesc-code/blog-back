import { PostsRepository } from './posts.repository';

describe('PostsRepository', () => {
  it('should be defined', () => {
    expect(new PostsRepository()).toBeDefined();
  });
});
