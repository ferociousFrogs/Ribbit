INSERT INTO users

(name, email, fb_token, time_stamp)

VALUES 
(
  ${userName}, ${email}, ${fbToken}, CURRENT_TIMESTAMP
)
RETURNING ID;