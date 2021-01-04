CREATE DATABASE IF NOT EXISTS prod_categ_db;

CREATE TABLE IF NOT EXISTS categories (
  id bigint(11) NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id bigint(11) NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
  price double NOT NULL,
  category_id bigint(20) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
)
