UPDATE messagesNCode

SET data = ${data}

WHERE messagesNCode.id = ${mCId}

RETURNING ID;