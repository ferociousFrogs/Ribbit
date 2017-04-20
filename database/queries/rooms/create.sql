CREATE TABLE IF NOT EXISTS rooms
(
  id serial PRIMARY KEY,
  name varchar(40) UNIQUE NOT NULL,
  user1_Id INT NOT NULL,
  user2_Id INT NOT NULL,
  code TEXT
);