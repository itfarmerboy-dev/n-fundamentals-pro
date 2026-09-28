import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUserPhone1790592685912 implements MigrationInterface {
    name = 'RemovedUserPhone1790592685912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

}
