import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1720949167324 implements MigrationInterface {
    name = 'SchemaUpdate1720949167324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "cost" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "real_estate_id" integer, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_4af5055a871c46d011345a255a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_c6a2649a3b4e5ca21c1f5016862" FOREIGN KEY ("real_estate_id") REFERENCES "real-estates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_c6a2649a3b4e5ca21c1f5016862"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_4af5055a871c46d011345a255a6"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
