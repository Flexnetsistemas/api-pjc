# Processo seletivo n. 01/2020 PJC/MT
# Projeto Prático Implementação BACK-END

- Autor:
Nome:  Ricardo de Assis
email: rdassis@gmail.com

# Procedimento para testes do projeto.
- Os testes poderão ser realizados utilizando os programas de comunicação REST Postman ou Insominia, ou qualquer sistema semenhante.
- Nos teste de POST e PUT usar no body Content-Type : application/json

# 1º Passo
- Fazer o login para receber o token
Exemplo:
```sh
POST: localhost:3000/api/v1/usuario/login
{
   "email" : "rdassis@gmail.com",  
   "senha" : "123456"
}
````
- Também poderá ser cadastrado um novo usuário, usando a URI abaixo, para posterior login (Passo 1º) e retorno do token.

Cadastro de Usuário:
```sh
POST: localhost:3000/api/v1/usuario
{
   "email": "seu-emailm@gmail.com",
    "senha": "123456"	
}
```
# 2º Passo
- De posse do token com expiração em 5 minutos fazer os testes descrito abaixo:

# ::CADASTRO DE ARTISTA
```sh
Content-Type : application/json
POST: localhost:3000/api/v1/artista/cadastro
{
    "nome": "Leonardo"
}
```
# ::CADASTRO DE ALBUM / multpart-form
```sh
POST: localhost:3000/api/v1/album
{
	"id_artista": 9,
	"nomeAlbum": "Love Goes",
	"capa" : (choose file)
}
```
# ::ALTERAÇÃO DO NOME ARTISTA
```sh
PUT : localhost:3000/api/v1/artista
{
	"id_artista": 9,
	"nome": "Madona"
}
````
# ::ALTERAÇÃO DE ALBUM
```sh
PUT: localhost:3000/api/v1/album
{
    "id_album" : 4,  
    "fk_artista": 6,
    "nomeAlbum": "Dance and Dance"
	}
````
# ::CONSULTAS
- As consultas para pesquisa podem ser aplicados tando para o álbum como para o artisa.
- É possível utilizar os parâmetros na URL (querystring) para personalizar a consulta. Veja nos exemplos abaixo:
```sh
GET : localhost:3000/api/v1/artista/?artista=Guns
GET : localhost:3000/api/v1/album/?album=use your
````
# ::ORDENAÇÃO
- A ordenação do álbum consulta pode ser combinada com a querystring ORDER, com asc ou desc. Veja exemplos abaixo:
```sh
GET : localhost:3000/api/v1/artista/?artista=Mike&order=desc
GET : localhost:3000/api/v1/artista/?artista=Mike&order=asc
````
# ::PAGINAÇÃO
- Utilize os parâmetros limit (para limitar a quantidade) e skip (para pular registros).

# ::SEGURANÇA
- Foi implementado no projeto a gravação da senha do usuário no banco de dados por hash
- Todas as rotas estão sendo validadas com token via middleware jwt.login.js gerado com JWT
- Utilizado CORS Access-Control-Allow-Origin para controle URL de origem.

# ::BANCO DE DADOS
-MySQL ou mariaDB
-Database: albumdb
-Tabela: usuario
-Tabela: artista 1->N album
-Carga inicial da base de dados clique aqui

