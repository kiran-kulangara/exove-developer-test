import { axios } from "./deps.js";
import { data } from "./data.js";
import * as productService from "./services/productsService.js";

// Function to fetch product details from an API
const fetchProductsDetails = async () => {
  try {
    // Make a GET request to the specified API endpoint
    const response = await axios.get(
      `https://github.com/Exove/developer-test/blob/main/material/products.json`
    );

    // Check if the request was successful
    if (response.status !== 200) {
      console.log("FIXME: The product details fetch from the API failed.");
      return null;
    }

    // NOTE: To avoid the hassle of scrapping the json data from the response,
    // the data is stored and used directly from the data.js
    return data;
  } catch (error) {
    console.error("Error fetching product details from the API", error);
    return null;
  }
};

// Function to fetch data from the API and populate the database
const fetchDataAndPopulateDB = async () => {
  const productsDetails = await fetchProductsDetails();

  // If fetching product details fails, exit the function
  if (!productsDetails) {
    return;
  }

  try {
    // Iterate over each product in the fetched data
    for (const product of productsDetails.products) {
      // Insert product data into the 'products' table and get the product ID
      const productId = await productService.createProductEntry(
        product.id,
        product.name,
        product.description
      );

      // Insert category data into the 'categories' table for each category in the product
      for (const category of product.categories) {
        await productService.createCategoryEntry(
          category.id,
          category.name,
          productId
        );
      }

      // Insert variation data into the 'variations' table for each variation in the product
      for (const variation of product.variations) {
        await productService.createVariationEntry(product.id, variation);
      }
    }
  } catch (error) {
    console.error("Error trying to populate database", error);
  }
};

// Call the function to fetch data and populate the database
await fetchDataAndPopulateDB();

// Log entries from the database for debugging
await productService.logDatabaseEntries();

/**
 * Clear all entries from the database.
 * This action is performed to ensure that subsequent runs won't encounter issues,
 * as the database is already populated with information. The use of the UNIQUE
 * constraint on the uuid field prevents duplicate entries and triggers an error
 * if an attempt is made to insert a duplicate record.
 */
await productService.clearDatabase();
