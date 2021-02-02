
CREATE DATABASE albumdb;

CREATE TABLE artista(
id_artista INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR (100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE album(
id_album INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
fk_artista INTEGER NOT NULL,
nomeAlbum VARCHAR(150) NOT NULL,
capa VARCHAR(100),
 FOREIGN KEY (fk_artista) REFERENCES artista(id_artista)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE usuario(
id_usuario INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO artista(nome) VALUES("Serj tankian");
INSERT INTO artista(nome) VALUES("Mike Shinoda");
INSERT INTO artista(nome) VALUES("Michel Teló");
INSERT INTO artista(nome) VALUES("Guns N' Roses");

INSERT INTO album(fk_artista,nome,capa) VALUES(1,"Harakiri",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(1,"Black Blooms",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(1,"The Rough Dog",null);

INSERT INTO album(fk_artista,nome,capa) VALUES(2,"The Rising Tied",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(2,"Post Traumatic",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(2,"Post Traumatic EP",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(2,"Where'd You Go",null);

INSERT INTO album(fk_artista,nome,capa) VALUES(3,"Bem Sertanejo",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(3,"Bem Sertanejo - O Show (AoVivo)",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(3,"Bem Sertanejo - (1ª Temporada) - EP",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(3,"Where'd You Go",null);

INSERT INTO album(fk_artista,nome,capa) VALUES(4,"Use Your IIIlusion I",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(4,"Use Your IIIlusion II",null);
INSERT INTO album(fk_artista,nome,capa) VALUES(4,"Greatest Hits",null);























