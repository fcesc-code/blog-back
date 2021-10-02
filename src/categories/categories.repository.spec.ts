import { CategoriesRepository } from './categories.repository';

describe('CategoriesRepository', () => {
  it('should be defined', () => {
    expect(new CategoriesRepository()).toBeDefined();
  });
});
