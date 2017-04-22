INSERT INTO rooms

(name)

VALUES 
(
  ${roomName}
)
RETURNING ID;