INSERT INTO rooms_users

(user_id, room_id)

VALUES 
(
  ${userId}, ${roomId}
)
RETURNING ID;