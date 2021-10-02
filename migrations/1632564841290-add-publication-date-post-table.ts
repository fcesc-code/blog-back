import {MigrationInterface, QueryRunner} from "typeorm";

export class addPublicationDatePostTable1632564841290 implements MigrationInterface {
    name = 'addPublicationDatePostTable1632564841290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" ADD "publication_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" DROP COLUMN "publication_date"`);
    }

}
