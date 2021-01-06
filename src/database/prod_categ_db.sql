CREATE DATABASE IF NOT EXISTS prod_categ_db;

CREATE TABLE IF NOT EXISTS categories (
  id bigint(11) NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  Pid bigint(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nameP varchar(50) NOT NULL,
  price double NOT NULL,
  category_id bigint(11) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
)
