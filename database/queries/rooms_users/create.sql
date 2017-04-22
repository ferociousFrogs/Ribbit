CREATE TABLE IF NOT EXISTS rooms_users
(
  id serial PRIMARY KEY,
  user_id varchar(40),
  room_id varchar(100),
  time_stamp TIMESTAMP
);