import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1720617640812 implements MigrationInterface {
    name = 'SchemaUpdate1720617640812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "path" character varying NOT NULL, "real_estate_id" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "real-estates" ADD "main_image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_6a11985e08f17596fc5a971849d" FOREIGN KEY ("real_estate_id") REFERENCES "real-estates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_6a11985e08f17596fc5a971849d"`);
        await queryRunner.query(`ALTER TABLE "real-estates" DROP COLUMN "main_image"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
