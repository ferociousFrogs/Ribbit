INSERT INTO users

(name, email, fb_token)

VALUES 
(
  ${name}, ${email}, ${fbToken}
)
RETURNING ID;