CREATE TABLE IF NOT EXISTS messages_code
(
  id SERIAL PRIMARY KEY,
  user1_Id INT,
  user2_Id INT,
  room_Id VARCHAR(40) NOT NULL,
  type VARCHAR(40),
  data TEXT,
  time_stamp TIMESTAMP
);