INSERT INTO users

(name, email, fb_token, time_stamp)

VALUES 
(
  ${name}, ${email}, ${fbToken}, CURRENT_TIMESTAMP
)
RETURNING ID;