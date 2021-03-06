SELECT 
  r.name as roomName

FROM rooms as r
INNER JOIN rooms_users as ru on r.id = ru.room_id
INNER JOIN users as u on ru.user_id = u.id

WHERE u.name = ${userName};
