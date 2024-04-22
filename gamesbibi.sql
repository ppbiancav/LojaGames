create database db_lojagames;

USE db_lojagames;

INSERT INTO tb_categoria (data, texto, titulo) 
VALUES (current_timestamp(), 'Texto da categoria 01', 'Categoria 01');
INSERT INTO tb_categoria (data, texto, titulo) 
VALUES (current_timestamp(), 'Texto da categoria 02', 'Categoria 02');

SELECT * FROM tb_categoria;

SELECT * FROM tb_produto; 