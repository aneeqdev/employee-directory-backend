import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesToEmployeeAndUser1751624550217 implements MigrationInterface {
    name = 'AddIndexesToEmployeeAndUser1751624550217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_ced43dd3badfcb2abcde18323c" ON "employees" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7496c7e6508db62ba4da839b3" ON "employees" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_a927eecda70146bdf59674d939" ON "employees" ("department") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd44cf0ec50ac11b25545098b4" ON "employees" ("location") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "IDX_bd44cf0ec50ac11b25545098b4"`);
        await queryRunner.query(`DROP INDEX "IDX_a927eecda70146bdf59674d939"`);
        await queryRunner.query(`DROP INDEX "IDX_c7496c7e6508db62ba4da839b3"`);
        await queryRunner.query(`DROP INDEX "IDX_ced43dd3badfcb2abcde18323c"`);
    }

}
