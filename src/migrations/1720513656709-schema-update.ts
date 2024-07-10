import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1720513656709 implements MigrationInterface {
    name = 'SchemaUpdate1720513656709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "real-estates" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "price_per_day" integer NOT NULL, "price_per_week" integer NOT NULL, "price_per_month" integer NOT NULL, "lat" numeric NOT NULL, "lng" numeric NOT NULL, "available" boolean NOT NULL DEFAULT true, "views_count" integer NOT NULL DEFAULT '0', "host_id" integer, "category_id" integer, CONSTRAINT "PK_2af625c6bc62fa91732595f4798" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "real-estates" ADD CONSTRAINT "FK_06f15f40fc0b55146f90d79e5c6" FOREIGN KEY ("host_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real-estates" ADD CONSTRAINT "FK_38b2aca9283af2081fd8ae31c89" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real-estates" DROP CONSTRAINT "FK_38b2aca9283af2081fd8ae31c89"`);
        await queryRunner.query(`ALTER TABLE "real-estates" DROP CONSTRAINT "FK_06f15f40fc0b55146f90d79e5c6"`);
        await queryRunner.query(`DROP TABLE "real-estates"`);
    }

}
