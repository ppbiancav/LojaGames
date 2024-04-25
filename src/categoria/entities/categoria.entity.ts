import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Usuario } from "../../usuario/entities/usuario.entity"
import { Produto } from "src/produto/entities/produto.entity"

@Entity({name: "tb_categoria"})
export class Categoria {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string
    
    @OneToMany(() => Produto, (produto) => produto.categoria, {
        onDelete: "CASCADE"
    })
    produto: Produto


}
