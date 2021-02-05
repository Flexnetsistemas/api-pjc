
DROP DATABASE IF EXISTS albumdb;

CREATE DATABASE albumdb;

USE albumdb;

DROP TABLE IF EXISTS artista;
CREATE TABLE artista(
id_artista INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR (100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS album;
CREATE TABLE album(
id_album INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
fk_artista INTEGER NOT NULL,
nomeAlbum VARCHAR(150) NOT NULL,
capa VARCHAR(100),
 FOREIGN KEY (fk_artista) REFERENCES artista(id_artista)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
id_usuario INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO artista(nome) VALUES("Serj tankian");
INSERT INTO artista(nome) VALUES("Mike Shinoda");
INSERT INTO artista(nome) VALUES("Michel Teló");
INSERT INTO artista(nome) VALUES("Guns N' Roses");

INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(1,"Harakiri","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(1,"Black Blooms","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(1,"The Rough Dog","");

INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(2,"The Rising Tied","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(2,"Post Traumatic","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(2,"Post Traumatic EP","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(2,"Where'd You Go","");

INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(3,"Bem Sertanejo","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(3,"Bem Sertanejo - O Show (AoVivo)","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(3,"Bem Sertanejo - (1ª Temporada) - EP","");


INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(4,"Use Your IIIlusion I","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(4,"Use Your IIIlusion II","");
INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(4,"Greatest Hits","");
