INSERT INTO rooms

(name, owner_one_id, owner_two_id)

VALUES 
(
  ${roomName}, ${user1_Id}, ${user2_Id}
)
RETURNING ID;