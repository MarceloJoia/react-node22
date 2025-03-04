import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1741104210729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                // Nome dad tabela a ser creada
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nameSituation",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "situationId",
                        type: "int",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    }
                ]
            }
        ));

        // Criar Chave estrangeira
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["situationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "situations",
                onDelete: "CASCADE",
            })
        );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a cheve estrangeira
        const table = await queryRunner.getTable("users"); // Recupero a tabela
        //  "?" le assim A tabela pode ser vazia.
        const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("situationId"));

        if (foreignKey) {
            // Apaga a chave estrangeira
            await queryRunner.dropForeignKey("users", foreignKey);
        }

        // Apaga a tabela Usuários
        await queryRunner.dropTable("users");
    }

}
