INSERT INTO rooms

(name, user1_Id)

VALUES 
(
  ${roomName}, ${userId}
)
RETURNING ID;