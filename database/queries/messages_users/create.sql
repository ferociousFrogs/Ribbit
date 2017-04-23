CREATE TABLE IF NOT EXISTS messages_users
(
  id serial PRIMARY KEY,
  user_id varchar(40),
  mc_id varchar(100),
  time_stamp TIMESTAMP
);