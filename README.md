# Processo seletivo n. 01/2020 PJC/MT
PROJETO PRÁTICO
IMPLEMENTAÇÃO BACK END

Procedimento para teste do projeto.
1º Passo
- Fazer o login para receber o token
Exemplo
POST: localhost:3000/api/v1/usuario/login
{
 "email" : "rdassis@gmail.com",  
	"senha" : "123456"
}

2º Passo
De posse do token com expiração em 5 minutos fazer os testes descrito abaixo:

::CADASTRO DE USUARIO
POST:   localhost:3000/api/v1/usuario
{
	"email": "seu-emailfm@gmail.com",
	"senha": "123456"	
}

// CADASTRO DE ARTISTA
post: localhost:3000/api/v1/artista/cadastro
{
	"nome": "NICO E LAU",
	"nomeAlbum": "Dança do siriri",
	"capa": ""
}

// CADASTRO DE ALBUM / multpart-form
post: localhost:3000/api/v1/album
{
	"id_artista": 9,
	"nomeAlbum": "Love Goes",
	"capa" : (choose file)
}

// ALTERAÇÃO DO NOME ARTISTA
put : localhost:3000/api/v1/artista
{
	"id_artista": 9,
	"nome": "Madona"
}

// ALTERAÇÃO DE ALBUM
put: localhost:3000/api/v1/album
{
               "id_album" : 15,  
	"fk_artista": 8,
	"nomeAlbum": "Dance Dance"
}









