// Add a Biblioteca para adicionar Metadados(Informações adicionais) a classe.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// Importar a Entidade Situação
import { Situation } from "./Situation";

/**
 * @Entity() - É o nome da tabela
 * Desenho da tablela que será implementada no Banco de dados
 */
@Entity("users")

// User - É o nome da tabela
export class User {
    /** 
     * @PrimaryGeneratedColumn()
     * 
     * @Animation Além disso, certifique-se de que você está usando o TypeScript versão 4.5 ou superior e de ter habilitado as seguintes configurações em 
     * tsconfig.json
     * "emitDecoratorMetadata": true,
     * "experimentalDecorators": true,
     * "resolveJsonModule": true,
     * "moduleResolution": "node"
     */

    // Essa DECORATOR resolve a instalação das colunas da tabela
    @PrimaryGeneratedColumn() // METADADOS:  Para usar esse Decorator precisa das config acima
    id!: number; // ! indica  que não é obrigatporio

    @Column() // INstala os atributos de cada linha 
    name!: string;

    @Column({ unique: true })
    email!: string;

    /**
     * Relacionamento OneToMany com a tabela Users
     * 
     * Muitos-para-um(Many-to-one) / um-para-muitos(one-to-many) é uma relação onde A contém múltiplas instâncias de B, mas B contém apenas uma instância de A. 
     * Vamos tomar como exemplo Usere PhotoEntidades. O usuário pode ter múltiplas fotos, mas cada foto é de propriedade de apenas um único usuário.
     */
    // @ManyToOne(type => Category)
    @ManyToOne(() => Situation, (situation) => situation.users) // Nome da tabela é (situation)
    // Este DECORATOR é opcional para @ManyToOne, mas obrigatório para @OneToOne
    @JoinColumn({ name: "situationId" }) //Nome da chave estrangeira
    situation!: Situation; // situation!: RECEBE O QUE VIER DA ENTIDADE Situation

    @Column()
    situationId!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}