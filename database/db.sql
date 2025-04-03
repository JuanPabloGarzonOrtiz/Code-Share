/*Tablas*/
CREATE TABLE users(
	id_user SERIAL PRIMARY KEY,
	token TEXT NOT NULL,
	display_name VARCHAR(255),
	user_name VARCHAR(40) NOT NULL,
	user_bio VARCHAR(160),
	photo_user VARCHAR(80),
	url_profile VARCHAR(60) NOT NULL
);

CREATE TABLE repositories(
	id_repo SERIAL PRIMARY KEY,
	name_repo VARCHAR(100) NOT NULL,
	description TEXT,
	url_page TEXT NOT NULL,
	id_user INTEGER NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id_user)
);