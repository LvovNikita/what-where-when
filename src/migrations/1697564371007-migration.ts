import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Создание таблицы notifications
 */
export class Migration1697564371007 implements MigrationInterface {
  name = 'Migration1697564371007'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('event', 'bday')`);
    await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL, "date" date NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "sourceId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
  }
}
