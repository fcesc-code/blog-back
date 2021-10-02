import { CategoryEntity } from 'src/categories/category.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly postId: string;

  @Column({ length: 55 })
  readonly title: string;

  @Column({ length: 255 })
  readonly description: string;

  @Column({ default: 0 })
  readonly num_likes: number;

  @Column({ default: 0 })
  readonly num_dislikes: number;

  @Column()
  readonly publication_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @ManyToMany(() => CategoryEntity, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  constructor(
    postId: string,
    title: string,
    description: string,
    num_likes: number,
    num_dislikes: number,
    publication_date: Date,
    user: UserEntity,
    categories: CategoryEntity[],
  ) {
    super();
    this.postId = postId;
    this.title = title;
    this.description = description;
    this.num_likes = num_likes;
    this.num_dislikes = num_dislikes;
    this.publication_date = publication_date;
    this.user = user;
    this.categories = categories;
  }
}
