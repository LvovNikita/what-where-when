import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Создание таблицы birthdays
 */
export class Migration1698509578857 implements MigrationInterface {
    name = 'Migration1698509578857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "birthdays" ("id" uuid NOT NULL, "subscriberId" character varying NOT NULL, "month" integer NOT NULL, "date" integer NOT NULL, "userHandler" character varying, "until" date NOT NULL DEFAULT '2033-09-25', CONSTRAINT "PK_d5cd856d4f7933abc1d9aa16c21" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "birthdays"`);
    }

}
