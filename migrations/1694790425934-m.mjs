export class M1694790425934 {
    name = 'M1694790425934'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" ADD "chatId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "repeatUntil" date NOT NULL DEFAULT '2033-09-15 18:13:28'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "repeatUntil"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "chatId"`);
    }

}
