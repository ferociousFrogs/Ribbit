CREATE TABLE IF NOT EXISTS rooms
(
  id serial PRIMARY KEY,
  name varchar(40) NOT NULL,
  owner_one_id INT NOT NULL,
  owner_two_id INT NOT NULL
);