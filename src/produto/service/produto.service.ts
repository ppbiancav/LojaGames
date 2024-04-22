import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from './../../categoria/service/categoria.service';

@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>, 
        
        private categoriaService: CategoriaService 
    ){}


    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });

    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;


    }

    async findByDescricao(descricao: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                categoria: true
            }
        })

    }

    async create(produtos: Produto): Promise<Produto>{

        if (produtos.categoria){

            let categoria = await this.categoriaService.findById(produtos.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produtos);
        }

        return await this.produtoRepository.save(produtos);

    }

    async update(produto: Produto): Promise<Produto>{

        if (produto.categoria){

            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produto);
        }

        let buscaProdutos = await this.findById(produto.id);

        if (!buscaProdutos || !produto.id)
            throw new HttpException('Produtos não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        let buscaProduto: Produto = await this.findById(id);
        
        if (!buscaProduto)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.delete(id);
        
    }

}