INSERT INTO messagesNCode

(room_Id, type, data, time_stamp)

VALUES 
(
  ${roomId}, ${type}, ${data}, CURRENT_TIMESTAMP
)
RETURNING ID;
