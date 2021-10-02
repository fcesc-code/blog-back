import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExistUserAliasPipe } from './Pipes/exist-user-alias.pipe';
import { ExistUserEmailPipe } from './Pipes/exist-user-email.pipe';
import { ValidUserIdPipe } from './Pipes/valid-user-id.pipe';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(
    @Param('id', ValidUserIdPipe) id: string,
  ): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ExistUserAliasPipe, ExistUserEmailPipe)
  async newUser(@Body() user: UserDto): Promise<UserDto> {
    return await this.usersService.newUser(user);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistUserAliasPipe, ExistUserEmailPipe)
  async updateUser(
    @Param('id', ValidUserIdPipe) id: string,
    @Body() user: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id', ValidUserIdPipe) id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }

  @Get('posts/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  getPostsByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getPostsByUser(userId);
  }

  @Get('categories/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  getCategoriesByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getCategoriesByUser(userId);
  }
}
