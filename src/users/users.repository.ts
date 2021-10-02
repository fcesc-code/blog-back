import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/category.entity';
import { PostEntity } from 'src/posts/post.entity';
import { DeleteResult, Not, Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mapper: UserMapper,
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  getUserByAlias(alias: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ alias });
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ email });
  }

  userAliasAlreadyExist(user: UserDto): Promise<number> {
    return this.usersRepository.count({
      where: { alias: user.alias, userId: Not(user.id) },
    });
  }

  userEmailAlreadyExist(user: UserDto): Promise<number> {
    return this.usersRepository.count({
      email: user.email,
      userId: Not(user.id),
    });
  }

  newUser(userDTO: UserDto): Promise<UserEntity> {
    const newUser = this.mapper.dtoToEntity(userDTO);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, userDTO: UserDto): Promise<UserEntity> {
    const updateUserDTO: UserDto = new UserDto(
      id,
      userDTO.name,
      userDTO.surname_1,
      userDTO.surname_2,
      userDTO.alias,
      userDTO.email,
      userDTO.password,
      userDTO.birth_date,
    );
    const updateUser = this.mapper.dtoToEntity(updateUserDTO);
    await this.usersRepository.update(id, updateUser);
    return this.usersRepository.findOne(id);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async getPostsByUser(userId: string): Promise<PostEntity[]> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { userId: userId },
      relations: ['posts'],
    });
    return user.posts;
  }

  async getCategoriesByUser(userId: string): Promise<CategoryEntity[]> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { userId: userId },
      relations: ['categories'],
    });
    return user.categories;
  }
}
