INSERT INTO messages_users

(user_id, mc_id, time_stamp)

VALUES 
(
  ${userId}, ${mCId}, CURRENT_TIMESTAMP
)
RETURNING ID;