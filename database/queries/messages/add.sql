INSERT INTO messages

(user_Id, room_Id, message)

VALUES 
(
  ${userId}, ${roomId}, ${message}
)
RETURNING ID;