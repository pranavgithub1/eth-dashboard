ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
CREATE DATABASE CryptoData;
USE CryptoData;
SOURCE updatetest.sql;