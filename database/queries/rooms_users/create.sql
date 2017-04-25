CREATE TABLE IF NOT EXISTS rooms_users
(
  id serial PRIMARY KEY,
  user_id INT,
  room_id INT,
  time_stamp TIMESTAMP
);