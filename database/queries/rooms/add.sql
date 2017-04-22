INSERT INTO rooms

(name, time_stamp)

VALUES 
(
  ${roomName}, CURRENT_TIMESTAMP
)
RETURNING ID;