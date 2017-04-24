CREATE TABLE IF NOT EXISTS messagesNCode
(
  id SERIAL PRIMARY KEY,
  room_Id VARCHAR(40) NOT NULL,
  type VARCHAR(40),
  data TEXT,
  time_stamp TIMESTAMP
);