# 3A-data-fetch-to-database

This directory contains the source code and tests for exercise **3A. Get data and save it locally**

## Directory Structure

```
3A-data-fetch-to-database
├── app
|   ├── app.js
|   ├── data.js
|   ├── deps.js
|   ├── package.json
|   ├── database
│   │    ├── database.js
│   ├── services
│       ├── productsService.js
│
├── flyway
│   ├── sql
│       ├── V1___initial_schema.sql
├── docker-compose.yml
├── project.env
└── README.md
```

### 1. `flyway/sql` directory

The `flyway/sql` directory contains the database migration files.

- **`V1___initial_schema.sql`**: This file contains the SQL commands for creating the `products`, `categories` and `variations` table, which will save the data from the [Product API](https://github.com/Exove/developer-test/blob/main/material/products.json).

### 2. `docker-compose.yml` file

The `docker-compose.yml` is a Docker Compose configuration file specifying two services: `database` and `flyway`.

- The `database` container is named `database-server` and uses a postgres image `postgres:14.1`

### 3. `project.env` file

The `project.env` file contains the database configurations for the postgres and flyway. It contains the username, password, database name etc.

### 4. `app` directory

The app directory contains the core application files responsible for fetching data from the [Product API](https://github.com/Exove/developer-test/blob/main/material/products.json) and storing it in the database.

- **`database/database.js`**: This file includes code for establishing a connection to the database and performing database operations.
- **`services/productsService.js`**: This file contains logic related to handling product data and the neccessary services for storing the data in the database.
- **`app.js`**: This file is the main entry point for the submission. It contains functions for making HTTP requests, handling API responses, and preparing the data for insertion into the database.
- **`data.js`**: This file contains the JSON data from the exercise and is used as a dummy to help ease the development process.
- **`deps.js`**: This file external dependencies that are used in the submission. It is just to improve readability and to increase the ease for refactor in future.

## Getting Started

### Prerequisites:

1. **Docker:** Ensure that Docker is installed on your system. You can download and install Docker from the official Docker website: [Get Docker](https://docs.docker.com/get-docker/).

2. **Docker Compose:** Docker Compose is a tool for defining and running multi-container Docker applications. It usually comes bundled with Docker on most systems. However, if you need to install it separately, you can follow the instructions on the official Docker Compose installation page: Install [Docker Compose](https://docs.docker.com/compose/install/).

I chose the Docker containers setup to database easily instead of installing it locally and to make the testing of the submission easy. Also for the database I chose PostgreSQL.

I used the `flyway` database migration tool to create the database when the containers are starting up. The tables, `products`, `categories` and `variations` are created in the database using the flyway on startup.

3. **Node & npm:** Ensure that `Node.js` and `npm` (Node Package Manager) are installed on your system. You can download and install them from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).

To get started, follow the below steps:

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:kiran-kulangara/exove-developer-test.git
   ```

2. **Move into the 3A-data-fetch-to-database folder:**

   ```bash
   cd 3A-data-fetch-to-database
   ```

3. **Run Docker:**

   ```bash
   docker compose up --build
   ```

And wait for the log file to show the similar to the below (This is to make sure that the database migration happened successfully and the tables are created in the backend.):

```
3a-data-fetch-to-database-flyway-1  | Successfully applied 1 migration to schema "public", now at version v1 (execution time 00:00.215s)
```

4. **Open a new terminal and go into the app folder:**

   ```bash
   cd 3A-data-fetch-to-database/app
   ```

5. **Install the dependencies:**

   ```bash
   npm install
   ```

6. **To run the code:**
   Run the code `app.js` using `npm start` and it will fetch the data and store it into the database and read it back and display it in the console logs.

   ```bash
   npm start
   ```

7. **To bring down the docker:**

   ```bash
   cd 3A-data-fetch-to-database
   docker compose down
   ```

## Exta points question answers

### 1. Figure a way to save the hierarchical data (see product variations and categories for example)

To save the hierarchical data (categories and variations), I have used a relational approach. The `categories` table has a foreign key reference to the `products` table, establishing a relationship. The `variations` table also has a foreign key referencing the `products` table.

### 2. Figure a way to handle schemaless data (variations)

[JSONB](https://www.postgresql.org/docs/current/datatype-json.html) datatype in PostgreSQL is a good choice for handling schemaless data like `variations`. The `variations` table uses JSONB to store different attributes without a predefined schema. This will allow us to store any key-value pairs in the `variation` column of the `variations` table.

### 3. Take into account that the database schema should support translations although the API doesn’t, use ISO 639-1 as language keys

To support translations, we can add a `language` column to relevant tables (e.g., `products`, `categories`, and `variations`). When querying, filter based on the desired language using ISO 639-1 language codes.

### 4. Add support for extra currencies

There are couple of possible ways provide support for extra currencies. Two of them are discussed below:

- As the prices are part of the `variations` table we can accomodate it in the current schema itself, as the `variation` uses `JSONB` and we can have additional fields in the object like `price-USD`, `price-EUR` etc.

- Another way is to have generate a uuid for each variation entry when it is created. This can be done by chaging the schema slightly: `uuid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4()`.
  Then create a new table, let's say `prices`, with columns such as `variation_id`, `currency`, and `price`. This way, we can store prices for a product variation in multiple currencies.

However, an important thing to keep in mind here is that the `exchange_rate` of the currency could vary and this has to be taken into consideration while implementing the logic. One way could be to store the price in a base currency and then when the price for another currency is needed, then in the backend calculate the price in real-time based on the exchange rate at that point in time.

### 5. How to update the product data from the API without re-saving everything but only parts that have changed

One way to handle this could be to use timestamps. If the product API can provide timestamps for products noting when it was last updated, then this could be stored in the database and then compared with in the future to avoid unneccassary updates.

### 6. Also note that not every object have IDs

If there is a need to generate an `id` for any entry then the database itself can create it by default if it is missing, if we have created the table accordingly using `uuid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4()`.

This can also be handled in the backend, if in the backend we see that an entry is missing `id` we could generate a `uuid` in the backend itself before saving it into the database.

## Improvements

1. **Assumptions about UUID:** Currently the code assumes that the `UUID` will always be provided by the API for products and categories. Hence, there is no check or error handling done for this. In an ideal world if an `id` is missing and if we want to generate one, then we will generate it in the backend within the application.

2. **data.js serving data:** The API link was returning the whole GitHub page and not just the JSON data. Hence, to make the development easier I went with hardcording the json data in the `data.js`. I could have implemented a small `node` server as a Docker container and served the JSON data over an enpoint from the server to simulate the real-world scenario.

3. **REST enpoints:** Currently the application is just logging the populated data from the table. However, it would be nice to user `Express.js` to create some RESTful APIs to retrieve and display the data in a more meaningful way.

4. **More error handling:** Currently the error handling is bare minimum and it does not do any kind of validation on the fetched products from the API. This could definitely be improved.

5. **Explore MongoDB:** I went with PostgreSQL as I've been working with it lately and I knew how to implement the requirements in Postgres. However, MongoDB is as an alternative database solution, especially for handling schema-less data like variations. This could be further explored.

6. **Automated Tests:** The code lacks tests. Meaningful tests could provide
