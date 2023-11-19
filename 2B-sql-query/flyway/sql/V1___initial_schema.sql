-- Create the 'people' table
CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);


-- Create the 'phones' table
CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES people(id),
    number VARCHAR(20)
);