import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728110460095 implements MigrationInterface {
    name = 'Init1728110460095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "description"`);
    }

}
