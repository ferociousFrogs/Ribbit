INSERT INTO rooms

(name, time_stamp)

VALUES 
(
  $1, CURRENT_TIMESTAMP
)
RETURNING ID;