CREATE TABLE Events_Users (
  id SERIAL PRIMARY KEY,
  user_id    serial REFERENCES Users (id) ON UPDATE CASCADE ON DELETE CASCADE
, event_id   serial REFERENCES Events (id) ON UPDATE CASCADE
, unique (user_id, event_id)
);