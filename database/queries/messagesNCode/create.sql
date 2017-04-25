CREATE TABLE IF NOT EXISTS messagesNCode
(
  id SERIAL PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  room_Id VARCHAR(40) NOT NULL,
  type VARCHAR(40),
  data TEXT,
  time_stamp TIMESTAMP
);