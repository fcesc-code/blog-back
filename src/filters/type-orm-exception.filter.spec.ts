import { TypeOrmExceptionFilter } from './type-orm-exception.filter';

describe('TypeOrmExceptionFilter', () => {
  it('should be defined', () => {
    expect(new TypeOrmExceptionFilter()).toBeDefined();
  });
});
