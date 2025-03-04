import { stringify } from "querystring";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSituationsTable1741104105260 implements MigrationInterface {

    // Criação da Tabela no Banco de dados
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "situations", // Nome da Tabela
                // As colunas a serem semeadas
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
    }

    // Apaga a Tabela "situations"
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("situations");
    }

}
