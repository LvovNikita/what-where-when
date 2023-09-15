/**
 * Миграция на изменение поля id таблицы events на автоматически генерируемое
 */
export class M1693604605581 {
    name = 'M1693604605581'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "id" DROP DEFAULT`);
    }
}
