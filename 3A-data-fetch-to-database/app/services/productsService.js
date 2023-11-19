import { sql } from "../database/database.js";

// Function to create a new product entry in the 'products' table
const createProductEntry = async (uuid, name, description) => {
  try {
    const product_uuid =
      await sql`INSERT INTO products (uuid, name, description) VALUES (${uuid}, ${name}, ${description}) RETURNING uuid;`;
    console.log("Product entry created successfully!");
    return product_uuid[0].uuid;
  } catch (error) {
    console.error("Error creating product entry", error);
  }
};

// Function to create a new category entry in the 'categories' table
const createCategoryEntry = async (uuid, name, product_id) => {
  try {
    await sql`INSERT INTO categories (uuid, name, product_id) VALUES (${uuid}, ${name}, ${product_id});`;
    console.log("Category entry created successfully!");
  } catch (error) {
    console.error("Error creating category entry", error);
  }
};

// Function to create a new variation entry in the 'variations' table
const createVariationEntry = async (product_id, variation) => {
  try {
    await sql`INSERT INTO variations (product_id, variation) VALUES (${product_id}, ${variation});`;
    console.log("Variation entry created successfully!");
  } catch (error) {
    console.error("Error creating variation entry", error);
  }
};

// Function to log all entries in the 'products', 'categories', and 'variations' tables
const logDatabaseEntries = async () => {
  const products = await sql`SELECT * FROM products`;
  console.log("Products:", products);

  const categories = await sql`SELECT * FROM categories`;
  console.log("Categories:", categories);

  const variations = await sql`SELECT * FROM variations`;
  console.log("Variations:", variations);
};

// Function to clear all entries from the 'products', 'categories', and 'variations' tables
const clearDatabase = async () => {
  await sql`DELETE FROM variations`;
  await sql`DELETE FROM categories`;
  await sql`DELETE FROM products`;
};

export {
  createProductEntry,
  createCategoryEntry,
  createVariationEntry,
  logDatabaseEntries,
  clearDatabase,
};
