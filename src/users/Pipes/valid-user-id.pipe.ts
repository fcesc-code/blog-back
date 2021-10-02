import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class ValidUserIdPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}
  async transform(value: any) {
    try {
      await this.usersService.getUserById(value);
    } catch (err) {
      throw new BadRequestException("User ID don't exist");
    }
    return value;
  }
}
