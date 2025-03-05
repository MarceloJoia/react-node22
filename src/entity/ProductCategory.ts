// Add a Biblioteca para adicionar Metadados(Informações adicionais) a classe.
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity("product_categories")

export class ProductCategory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    // Relacionamento Um-Para-Muito(OneToMany) com a tabela products
    /**
     * Product - Entidade externa a ser usada.
     * 
     */
    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];
}

