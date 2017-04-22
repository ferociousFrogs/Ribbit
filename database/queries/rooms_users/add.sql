INSERT INTO rooms_users

(user_id, room_id, time_stamp)

VALUES 
(
  ${userId}, ${roomId}, CURRENT_TIMESTAMP
)
RETURNING ID;