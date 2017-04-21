SELECT 
  u1.name as user1Name,
  u2.name as user2Name,
  r.name as roomName,
  m.type as type,
  m.data as data

FROM rooms as room_id
INNER JOIN messages_code as mc on rooms.id = mc.room_id
INNER JOIN users as u1 on mc.user1_id = u1.id
INNER JOIN users as u2 on mc.user2_id = u2.id

WHERE roomName = ${roomName}
AND
( 
  user1Name = ${userName} 
  OR user2Name = ${userName}
);
