# Processo seletivo n. 01/2020 PJC/MT
# Projeto Prático
# Implementação BACK-END



# Procedimento para teste do projeto.
- Os teste poderão ser realizados utilizando os programas de comunicação REST Postman ou Insominia, ou qualquer sistema semenhante.

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
- Também poderá ser cadastrado um novo usuário, usando a URI abaixo, para posterior login (Passo 1º) e retorno do token
Cadastro de Usuário:
```sh
POST: localhost:3000/api/v1/usuario
{
	"email": "seu-emailfm@gmail.com",
	"senha": "123456"	
}
```

# 2º Passo
- De posse do token com expiração em 5 minutos fazer os testes descrito abaixo:

# ::CADASTRO DE ARTISTA
```sh
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







