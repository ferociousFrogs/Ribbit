SELECT user_Id, message

FROM messages

WHERE messages.room_id = ${roomId}