CREATE TABLE Events(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL 
);