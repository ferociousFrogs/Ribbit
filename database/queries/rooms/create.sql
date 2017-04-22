CREATE TABLE IF NOT EXISTS rooms
(
  id serial PRIMARY KEY,
  name varchar(40) UNIQUE NOT NULL,
  datetime TIMESTAMP
);