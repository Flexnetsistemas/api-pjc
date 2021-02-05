# Processo seletivo n. 01/2020 PJC/MT
## Projeto Prático Implementação BACK-END

- Autor: Ricardo de Assis  &nbsp; email: rdassis@gmail.com

## Procedimento para testes do projeto.
- Os testes poderão ser realizados utilizando os programas de comunicação REST Postman, Insominia ou qualquer sistema equivalente.
- No teste de POST e PUT usar Content-Type : application/json no Header.

## Pré Requisitos
- Node.js
#### Dependências:
````
"dependencies": {
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "minio": "^7.0.18",
    "multer": "^1.4.2",
    "mysql": "^2.18.1"
  }
  ````
  - MySql ou mariaDB

## 1º Passo
- Cadastro de Usuário:
```sh
POST: localhost:3000/api/v1/usuario
{
   "email": "seu-emailm@gmail.com",
   "senha": "123456"	
}
```
## 2º Passo
- Fazer o login para receber o token, expira em 5 minutos. 
Exemplo:
```sh
POST: localhost:3000/api/v1/usuario/login
{
   "email" : "seu-emailm@gmail.com",  
   "senha" : "123456"
}
````
## 3º Passo
- De posse do token com fazer os testes descritos abaixo:
- O Token deve ser inserido na opção de Authorization Bearer Token

## ::CADASTRO DE ARTISTA
```sh
Content-Type : application/json
POST: localhost:3000/api/v1/artista/cadastro
{
    "nome": "Leonardo"
}
```
## ::CADASTRO DE ÁLBUM / multpart-form
- É necessário informar a foreign key do artista, para listar os artistas use:
````
GET : localhost:3000/api/v1/artista/
````
- De posse do id_artista, faça o cadastro conforme exemplo abaixo: 
```sh
POST: localhost:3000/api/v1/album
{
	"fk_artista": 2,
	"nomeAlbum": "Love Goes",
	"capa" : (choose file)
}
```
## ::ALTERAÇÃO DO NOME ARTISTA
```sh
PUT : localhost:3000/api/v1/artista
{
	"id_artista": 3,
	"nome": "Madona"
}
````
## ::ALTERAÇÃO DE ÁLBUM
```sh
PUT: localhost:3000/api/v1/album
{
    "id_album" : 3,  
    "fk_artista": 2,
    "nomeAlbum": "Dance and Dance"
}
````
## ::CONSULTAS
- As consultas para pesquisa podem ser aplicados tando para o álbum como para o artista.
- É possível utilizar os parâmetros na URL (querystring) para personalizar a consulta. Veja nos exemplos abaixo:
```sh
GET : localhost:3000/api/v1/artista/?artista=Guns
GET : localhost:3000/api/v1/album/?album=use your
````
## ::ORDENAÇÃO
- A ordenação dos artistas pode ser combinada com a querystring ORDER, com asc ou desc. Veja exemplos abaixo:
```sh
GET : localhost:3000/api/v1/artista/?artista=mi&order=asc
````
- Através da consulta de álbum e feito a ordenação usando a querystring ORDER, com asc ou desc. Veja exemplos abaixo:
````
GET: localhost:3000/api/v1/album/?album=Sertanejo&order=desc
````
## ::PAGINAÇÃO
- Utilize os parâmetros LIMIT (para limitar a quantidade) e SKIP (para pular registros).
- A paginação do álbum pode ser combinado com a string ORDER, veja exemplo abaixo
````
GET: localhost:3000/api/v1/album/?album=Sertanejo&&limit=3&skip=0&order=asc
````

## ::SEGURANÇA
- Foi implementado no projeto a gravação da senha do usuário no banco de dados por hash
- Todas as rotas estão sendo validadas com token via middleware jwt.login.js gerado com JWT
- Token com expiração de 5 minutos
- o pre-signed URL das imagens da capa tem expiração de 5 minutos
- Utilizado CORS Access-Control-Allow-Origin para controle URL de origem.
#### OBSERVAÇÃO
- O controle de origem esta liberado para todas origens, no entanto para ativa-lo, basta substituir o * pelo URL de origem, veja abaixo:
- file app.js
````
    app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*')
    app.use(cors())
    next()
````

## ::BANCO DE DADOS
- MySQL ou mariaDB
- Database: albumdb
- Tabela: usuario
- Tabela: artista 1->N album
- Carga inicial da base de dados em https://github.com/Flexnetsistemas/api-pjc/tree/master/script

