USE bawwzoeizzuehatgliy3;
/*Tablas*/
CREATE TABLE users(
	id_user INTEGER PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(39) NOT NULL,
	userBio VARCHAR(160),
	photoUser TEXT
);
CREATE TABLE repositories(
	id_repo INTEGER PRIMARY KEY AUTO_INCREMENT,
	nameRepo VARCHAR(100) NOT NULL,
	description TEXT,
	urlPage TEXT NOT NULL,
	screemshots JSON NOT NULL,
	id_user INTEGER NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id_user)
);