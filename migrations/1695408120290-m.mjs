export class M1695408120290 {
    name = 'M1695408120290'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "event-notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, CONSTRAINT "PK_c2271a7069032acbee743eb846a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "repeatUntil" SET DEFAULT '2033-09-22 21:42:01'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "repeatUntil" SET DEFAULT '2033-09-15'`);
        await queryRunner.query(`DROP TABLE "event-notification"`);
    }
}
