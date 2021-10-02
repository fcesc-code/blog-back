import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class ExistUserAliasPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}
  async transform(value: UserDto) {
    const numAlias: number = await this.usersService.userAliasAlreadyExist(
      value,
    );

    if (numAlias > 0) {
      throw new BadRequestException('Alias value already exists');
    }

    return value;
  }
}
