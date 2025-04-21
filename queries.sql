-- user table
CREATE TABLE users(
user_id uuid DEFAULT gen_random_uuid(),
email TEXT,
name TEXT,
password TEXT,
PRIMARY KEY(user_id)
)