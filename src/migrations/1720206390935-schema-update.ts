import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1720206390935 implements MigrationInterface {
    name = 'SchemaUpdate1720206390935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."host_requests_status_enum" AS ENUM('pending', 'confirmed', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "host_requests" ("id" SERIAL NOT NULL, "file" character varying NOT NULL, "status" "public"."host_requests_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_7650e6273b6f8446d7b0bab72d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'host', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "photo" character varying NOT NULL DEFAULT 'default.png', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "host_requests" ADD CONSTRAINT "FK_b833ca6d3f6602b6d80de965b11" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "host_requests" DROP CONSTRAINT "FK_b833ca6d3f6602b6d80de965b11"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "host_requests"`);
        await queryRunner.query(`DROP TYPE "public"."host_requests_status_enum"`);
    }

}
