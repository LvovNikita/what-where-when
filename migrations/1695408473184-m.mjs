export class M1695408473184 {
    name = 'M1695408473184'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event-notification" ADD "eventId" uuid`);
        await queryRunner.query(`ALTER TABLE "event-notification" ADD CONSTRAINT "UQ_89063f5ee6357b5d0c1b07509a0" UNIQUE ("eventId")`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "repeatUntil" SET DEFAULT '2033-09-22 21:47:54'`);
        await queryRunner.query(`ALTER TABLE "event-notification" ADD CONSTRAINT "FK_89063f5ee6357b5d0c1b07509a0" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event-notification" DROP CONSTRAINT "FK_89063f5ee6357b5d0c1b07509a0"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "repeatUntil" SET DEFAULT '2033-09-22'`);
        await queryRunner.query(`ALTER TABLE "event-notification" DROP CONSTRAINT "UQ_89063f5ee6357b5d0c1b07509a0"`);
        await queryRunner.query(`ALTER TABLE "event-notification" DROP COLUMN "eventId"`);
    }
}
