import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_categoria"})
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo: string;

    @OneToMany(()=> Produto, (produto)=> produto.categoria)
    produto: Produto []


    
}