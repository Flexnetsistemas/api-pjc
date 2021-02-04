# Processo seletivo n. 01/2020 PJC/MT
# PROJETO PRÁTICO
# IMPLEMENTAÇÃO BACK END

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

# Procedimento para teste do projeto.
- Os teste poderão ser realizado utilizando os programas de comunicação REST Postman ou Insominia, ou qualquer sistema semanhante.

# 1º Passo
- Fazer o login para receber o token
Exemplo
```sh
POST: localhost:3000/api/v1/usuario/login
{
 "email" : "rdassis@gmail.com",  
	"senha" : "123456"
}
````
# 2º Passo
- De posse do token com expiração em 5 minutos fazer os testes descrito abaixo:

# ::CADASTRO DE USUARIO
```sh
POST:   localhost:3000/api/v1/usuario
{
	"email": "seu-emailfm@gmail.com",
	"senha": "123456"	
}
```
# ::CADASTRO DE ARTISTA
```sh
POST: localhost:3000/api/v1/artista/cadastro
{
	"nome": "NICO E LAU",
	"nomeAlbum": "Dança do siriri",
	"capa": ""
}
```
# ::CADASTRO DE ALBUM / multpart-form
```sh
post: localhost:3000/api/v1/album
{
	"id_artista": 9,
	"nomeAlbum": "Love Goes",
	"capa" : (choose file)
}
```
# ::ALTERAÇÃO DO NOME ARTISTA
```sh
put : localhost:3000/api/v1/artista
{
	"id_artista": 9,
	"nome": "Madona"
}
````
# ::ALTERAÇÃO DE ALBUM
```sh
put: localhost:3000/api/v1/album
{
        "id_album" : 4,  
	"fk_artista": 6,
	"nomeAlbum": "Dance Dance"
}
````







