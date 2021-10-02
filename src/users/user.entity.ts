import * as bcrypt from 'bcrypt';
import { CategoryEntity } from 'src/categories/category.entity';
import { PostEntity } from 'src/posts/post.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column({ length: 55 })
  readonly name: string;

  @Column({ length: 55 })
  readonly surname_1: string;

  @Column({ length: 55, nullable: true })
  readonly surname_2: string;

  @Column({
    unique: true,
    length: 25,
  })
  readonly alias: string;

  @Column({
    unique: true,
  })
  readonly email: string;

  @Column({ type: 'varchar', length: 70 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }

  @Column({ nullable: true })
  readonly birth_date: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  constructor(
    userId: string,
    name: string,
    surname_1: string,
    surname_2: string,
    alias: string,
    email: string,
    password: string,
    birth_date: Date,
  ) {
    super();
    this.userId = userId;
    this.name = name;
    this.surname_1 = surname_1;
    this.surname_2 = surname_2;
    this.alias = alias;
    this.email = email;
    this.password = password;
    this.birth_date = birth_date;
  }
}
