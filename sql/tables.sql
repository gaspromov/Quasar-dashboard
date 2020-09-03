CREATE TABLE Sessions(
    session_id varchar(32) NOT NULL PRIMARY KEY,
    user_id BIGINT REFERENCES DiscordUsers(id)
);