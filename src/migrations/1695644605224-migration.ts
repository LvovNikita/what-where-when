import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Создание таблицы events
 */
export class Migration1695644605224 implements MigrationInterface {
  name = 'Migration1695644605224'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."events_type_enum" AS ENUM('special', 'weekly', 'monthly', 'annual', 'one_time')`);
    await queryRunner.query(`CREATE TYPE "public"."events_week_enum" AS ENUM('1', '2', '3', '4', '5', 'first', 'last')`);
    await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL, "subject" character varying NOT NULL, "type" "public"."events_type_enum" NOT NULL, "subscriberId" character varying NOT NULL, "year" integer, "month" integer, "date" integer, "week" "public"."events_week_enum", "day" integer, "until" date NOT NULL DEFAULT '2033-09-25 15:23:31', CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TYPE "public"."events_week_enum"`);
    await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
  }
}
