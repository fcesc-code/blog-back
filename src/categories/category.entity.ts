import { UserEntity } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly categoryId: string;

  @Column({ unique: true, length: 55 })
  readonly title: string;

  @Column({ length: 255 })
  readonly description: string;

  @Column({ unique: true, length: 7 })
  readonly css_color: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;

  constructor(
    categoryId: string,
    title: string,
    description: string,
    css_color: string,
    user: UserEntity,
  ) {
    super();
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.css_color = css_color;
    this.user = user;
  }
}
