SELECT id 

FROM messagesNCode

WHERE
(
  sender_id = ${senderId} or sender_id = ${receiverId}
)
AND 
(
  receiver_id = ${receiverId} or receiver_id = ${senderId}
)
AND
type = 'code';
