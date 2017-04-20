CREATE TABLE IF NOT EXISTS messages
(
  id serial PRIMARY KEY,
  user_Id INT NOT NULL,
  room_Id varchar(40) UNIQUE NOT NULL,
  message TEXT
);