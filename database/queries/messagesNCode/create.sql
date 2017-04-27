CREATE TABLE IF NOT EXISTS messagesNCode
(
  id SERIAL PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  room_Id INT,
  type VARCHAR(40),
  data TEXT,
  time_stamp TIMESTAMP
);