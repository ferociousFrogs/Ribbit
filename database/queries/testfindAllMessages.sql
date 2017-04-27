SELECT 
  u1.name as user1Name,
  u2.name as user2Name,
  rooms.name as roomName,
  mc.id as mCId,
  mc.type as type,
  mc.data as data

FROM rooms
INNER JOIN messagesNCode as mc on rooms.id = mc.room_id
INNER JOIN users as u1 on mc.sender_id = u1.id
INNER JOIN users as u2 on mc.receiver_id = u2.id

WHERE rooms.name = 'Airport'
AND
( 
  u1.name = 'Leeloo'
  OR u2.name = 'Leeloo'
);
