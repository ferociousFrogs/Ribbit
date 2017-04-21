INSERT INTO messages_code

(user1_Id, user2_Id, room_Id, type, data)

VALUES 
(
  ${user1Id}, ${user2Id}, ${roomId}, ${type}, ${data}
)
RETURNING ID;
