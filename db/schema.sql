DROP DATABASE IF EXISTS movie_db;

CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movies (
    movie_id INT NOT NULL AUTO_INCREMENT,
    movie_title VARCHAR(45) NULL,
    actors_name VARCHAR (45) NULL,
    director VARCHAR (45) NULL,
    producer VARCHAR (45) NULL,
    genre VARCHAR (255) NULL,
    release_date DECIMAL (10) NULL,
    budget DECIMAL (10) NULL,
    revenue DECIMAL (10) NULL,
    original_language VARCHAR (255) NULL,
    runtime DECIMAL (10) NULL,
    country VARCHAR (45) NULL,
    rotten_tomatoes VARCHAR (255) NULL,
    plot VARCHAR (255) NULL,
    ratings INT NOT NULL,
    PRIMARY KEY (movie_id)
);