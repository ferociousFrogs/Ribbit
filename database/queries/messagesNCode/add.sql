INSERT INTO messagesNCode

(room_Id, sender_id, receiver_id, type, data, time_stamp)

VALUES 
(
  ${roomId}, ${senderId}, ${receiverId}, ${type}, ${data}, CURRENT_TIMESTAMP
)
RETURNING ID;
