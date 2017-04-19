INSERT INTO rooms

(name, user1_Id, user2_Id)

VALUES 
(
  ${roomName}, ${user1_Id}, ${user2_Id}
)
RETURNING ID;