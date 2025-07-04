import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInitialTables1700000000000 implements MigrationInterface {
    name = 'CreateInitialTables1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "role",
                        type: "varchar",
                        default: "'user'",
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        // Create employees table
        await queryRunner.createTable(
            new Table({
                name: "employees",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "department",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "location",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "hireDate",
                        type: "date",
                    },
                    {
                        name: "salary",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
        await queryRunner.dropTable("users");
    }
}

// NOTE: New indexes have been added to Employee and User entities. Run the following command to generate a migration for these indexes:
// npm run migration:generate -- -n AddIndexesToEmployeeAndUser 