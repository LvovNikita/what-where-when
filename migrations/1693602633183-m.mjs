/**
 * Миграция на создание таблицы events
 */
export class M1693602633183 {
    name = 'M1693602633183'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."events_type_enum" AS ENUM('special', 'weekly', 'monthly', 'annual', 'one_time')`);
        await queryRunner.query(`CREATE TYPE "public"."events_week_enum" AS ENUM('1', '2', '3', '4', '5', 'first', 'last')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL, "subject" character varying NOT NULL, "type" "public"."events_type_enum" NOT NULL, "week" "public"."events_week_enum", "dayOfTheWeek" integer, "month" integer, "day" integer, "year" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_week_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
    }
}
