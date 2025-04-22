-- user table
CREATE TABLE users(
user_id uuid DEFAULT gen_random_uuid(),
email TEXT,
name TEXT,
password TEXT,
PRIMARY KEY(user_id)
)

-- blog table
CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
title TEXT,
content TEXT,
tags TEXT[],
create_at TIMESTAMPTZ,
update_at TIMESTAMPTZ
author_id UUID ,
FOREIGN KEY(author_id) REFERENCES users(user_id) 
)
