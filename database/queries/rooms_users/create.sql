CREATE TABLE IF NOT EXISTS rooms_users
(
  id serial PRIMARY KEY,
  user_id varchar(40) NOT NULL,
  room_id varchar(100),
  datetime TIMESTAMP
);