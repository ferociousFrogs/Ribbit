SELECT id 

FROM rooms_users

WHERE
(
  user_id = ${userId}
)
AND 
(
  room_id = ${roomId}
);

