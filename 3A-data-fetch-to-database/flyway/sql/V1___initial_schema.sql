-- Create the 'products' table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Create the 'categories' table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL,
    name TEXT NOT NULL,
    product_id UUID REFERENCES products(uuid)
);

-- Create the 'variations' table
CREATE TABLE variations (
    id SERIAL PRIMARY KEY,
    product_id UUID REFERENCES products(uuid),
    variation JSONB NOT NULL
);

