INSERT INTO messages_users

(user_id, mc_id, time_stamp)

VALUES 
(
  ${userId}, ${mcId}, CURRENT_TIMESTAMP
)
RETURNING ID;