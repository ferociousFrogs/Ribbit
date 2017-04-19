CREATE TABLE IF NOT EXISTS users
(
  id serial PRIMARY KEY,
  name varchar(40) NOT NULL,
  email varchar(100)
);