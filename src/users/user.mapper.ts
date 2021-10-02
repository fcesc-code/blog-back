import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  dtoToEntity(userDTO: UserDto): UserEntity {
    return new UserEntity(
      userDTO.id,
      userDTO.name,
      userDTO.surname_1,
      userDTO.surname_2,
      userDTO.alias,
      userDTO.email,
      userDTO.password,
      userDTO.birth_date,
    );
  }

  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(
      userEntity.userId,
      userEntity.name,
      userEntity.surname_1,
      userEntity.surname_2,
      userEntity.alias,
      userEntity.email,
      userEntity.password,
      userEntity.birth_date,
    );
  }
}
