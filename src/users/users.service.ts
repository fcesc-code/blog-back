import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/categories/category.entity';
import { PostEntity } from 'src/posts/post.entity';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mapper: UserMapper,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.usersRepository.getAllUsers();
    return users.map((user) => this.mapper.entityToDto(user));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user: UserEntity = await this.usersRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async getUserByAlias(alias: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByAlias(alias);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async userAliasAlreadyExist(user: UserDto): Promise<number> {
    return await this.usersRepository.userAliasAlreadyExist(user);
  }

  async userEmailAlreadyExist(user: UserDto): Promise<number> {
    return await this.usersRepository.userEmailAlreadyExist(user);
  }

  async newUser(userDTO: UserDto): Promise<UserDto> {
    const newUser: UserEntity = await this.usersRepository.newUser(userDTO);
    return this.mapper.entityToDto(newUser);
  }

  async updateUser(id: string, userDTO: UserDto): Promise<UserDto> {
    const updateUser = await this.usersRepository.updateUser(id, userDTO);
    return this.mapper.entityToDto(updateUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }

  async getPostsByUser(userId: string): Promise<PostEntity[]> {
    return await this.usersRepository.getPostsByUser(userId);
  }

  async getCategoriesByUser(userId: string): Promise<CategoryEntity[]> {
    return await this.usersRepository.getCategoriesByUser(userId);
  }
}
