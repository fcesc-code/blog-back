import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1632424134828 implements MigrationInterface {
    name = 'initDb1632424134828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("postId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(55) NOT NULL, "description" character varying(255) NOT NULL, "num_likes" integer NOT NULL DEFAULT '0', "num_dislikes" integer NOT NULL DEFAULT '0', "userUserId" uuid, CONSTRAINT "PK_cdc670193be6ca43f590dbabcee" PRIMARY KEY ("postId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(55) NOT NULL, "surname_1" character varying(55) NOT NULL, "surname_2" character varying(55), "alias" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying(70) NOT NULL, "birth_date" TIMESTAMP, CONSTRAINT "UQ_f002c336d3299ee4eba00196902" UNIQUE ("alias"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(55) NOT NULL, "description" character varying(255) NOT NULL, "css_color" character varying(7) NOT NULL, "userUserId" uuid, CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title"), CONSTRAINT "UQ_1a5d177ff3717a0e176df4202ed" UNIQUE ("css_color"), CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "posts_categories_categories" ("postsPostId" uuid NOT NULL, "categoriesCategoryId" uuid NOT NULL, CONSTRAINT "PK_5cf543de0b22d9d4d49a6ac525b" PRIMARY KEY ("postsPostId", "categoriesCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb75b828afba720864a36ec45b" ON "posts_categories_categories" ("postsPostId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9775a9a72195dcf79ae7803a82" ON "posts_categories_categories" ("categoriesCategoryId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_b4855b3fc6710c40dc4eef9cf96" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_64f218a58a04de781e7236881b8" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_categories_categories" ADD CONSTRAINT "FK_fb75b828afba720864a36ec45b7" FOREIGN KEY ("postsPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_categories_categories" ADD CONSTRAINT "FK_9775a9a72195dcf79ae7803a821" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_categories_categories" DROP CONSTRAINT "FK_9775a9a72195dcf79ae7803a821"`);
        await queryRunner.query(`ALTER TABLE "posts_categories_categories" DROP CONSTRAINT "FK_fb75b828afba720864a36ec45b7"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_64f218a58a04de781e7236881b8"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b4855b3fc6710c40dc4eef9cf96"`);
        await queryRunner.query(`DROP INDEX "IDX_9775a9a72195dcf79ae7803a82"`);
        await queryRunner.query(`DROP INDEX "IDX_fb75b828afba720864a36ec45b"`);
        await queryRunner.query(`DROP TABLE "posts_categories_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
