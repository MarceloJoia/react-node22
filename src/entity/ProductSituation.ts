// Add a Biblioteca para adicionar Metadados(Informações adicionais) a classe.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity("product_situations")

export class ProductSituation {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    // Relacionamento OneToMany com a tabela products
    @OneToMany(() => Product, (product) => product.situation)
    products!: Product[];
}
