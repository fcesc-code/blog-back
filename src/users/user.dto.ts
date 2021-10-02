import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname_1: string;

  @ApiProperty()
  readonly surname_2?: string;

  @ApiProperty()
  readonly alias: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly birth_date?: Date;

  @ApiProperty()
  readonly posts: string[];

  @ApiProperty()
  readonly categories: string[];

  constructor(
    id: string,
    name: string,
    surname_1: string,
    surname_2: string,
    alias: string,
    email: string,
    password: string,
    birth_date: Date,
  ) {
    this.id = id;
    this.name = name;
    this.surname_1 = surname_1;
    this.surname_2 = surname_2;
    this.alias = alias;
    this.email = email;
    this.password = password;
    this.birth_date = birth_date;
  }
}
