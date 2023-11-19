# 2B-sql-query

This directory contains the source code and tests for exercise **Section 2B. Create an SQL query**

## Directory Structure

```
2B-sql-query
├── flyway
│   ├── sql
│       ├── V1___initial_schema.sql
│       ├── V2___initial_test_data.sql
├── docker-compose.yml
├── project.env
├── query.sql
└── README.md
```

### 1. `flyway/sql` directory

The `flyway/sql` directory contains the database migration files.

- **`V1___initial_schema.sql`**: This file contains the SQL commands for creating the `people` and `phones` table
- **`V2___initial_test_data.sql`**: This file contains SQL commands for populating the tables with the initial data provided in the exercise in [here](https://github.com/Exove/developer-test/blob/main/README.md).

### 2. `docker-compose.yml` file

The `docker-compose.yml` is a Docker Compose configuration file specifying two services: `database` and `flyway`.

- The `database` container is named `database-server` and uses a postgres image `postgres:14.1`

### 3. `project.env` file

The `project.env` file contains the database configurations for the postgres and flyway. It contains the username, password, database name etc.

### 4. `query.sql` file

The `query.sql` file contains the SQL query to get the desired output for the exercise.

## Getting Started

### Prerequisites:

1. **Docker:** Ensure that Docker is installed on your system. You can download and install Docker from the official Docker website: [Get Docker](https://docs.docker.com/get-docker/).

2. **Docker Compose:** Docker Compose is a tool for defining and running multi-container Docker applications. It usually comes bundled with Docker on most systems. However, if you need to install it separately, you can follow the instructions on the official Docker Compose installation page: Install [Docker Compose](https://docs.docker.com/compose/install/).

I chose the Docker containers setup to make the testing of the query easy. Also for the database I chose PostgreSQL.

I used the `flyway` database migration tool to create and populate the database when the containers are starting up. The two tables, `people` and `phones` are created in the database using the flyway on startup.

To get started, follow the below steps:

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:kiran-kulangara/exove-developer-test.git
   ```

2. **Move into the 2B-sql-query folder:**

   ```bash
   cd 2B-sql-query
   ```

3. **Run Docker:**

   ```bash
   docker compose up --build
   ```

And wait for the log file to show the below (This is to make sure that the database migration happened successfully and the tables are created in the backend.):

```
2b-sql-query-flyway-1  | Successfully applied 2 migrations to schema "public", now at version v2 (execution time 00:00.272s)
```

4. **Open a new terminal and log into the database container:**

   ```bash
   docker exec -it database-server psql -U username -d database -W
   ```

   **NOTE:** The password of the database is set as `password`.

5. **Make sure that the tables are created and populated with the correct data:**

Run the below queries to make sure that the database is created and populated with correct data.

```
database=#  select * from people;
+----+------------+-------------+
| id | first_name | last_name   |
+----+------------+-------------+
|  1 | John       | Smith       |
|  2 | Mary       | Jones       |
|  3 | Gerhard    | Feuerhaufen |
|  4 | Rami       | Pitkäniemi  |
|  5 | Anna       | Kråkström   |
+----+------------+-------------+

```

```
database=#  select * from people;
+----+---------+------------------+
| id | user_id | number           |
+----+---------+------------------+
|  1 |       2 | +1 213 621 0002  |
|  2 |       2 | +1 800 444 4444  |
|  3 |       1 | +1 604 444 4444  |
|  4 |       1 | +44 20 8759 9036 |
|  5 |       4 | +358 50 333 3333 |
|  6 |       5 | +46 771 793 336  |
+----+---------+------------------+
```

6. **Copy and paste the query from the `query.sql` to the `psql` commandline**

```
database=#  <content_from_query.sql>;
```

7. **To bring down the docker:**

   ```bash
   docker compose down
   ```

## Background

### 1. Why and how did you came up with the implementation?

The query retrieves the name and phone numbers for each person in the people table, ensuring that each person has a single entry in the result set, even if they have multiple phone numbers. It also sorts the results by the person's last name and first name.

### Query explanation:

1. **SELECT clause:**

```
SELECT
  CONCAT(p.first_name, ' ', p.last_name) AS name,
  COALESCE(STRING_AGG(ph.number, ',' ORDER BY ph.number), 'N/A') AS numbers
```

This part of the query specifies what columns to retrieve from the database. In this case, it's retrieving two columns:

- **name:** This is a derived column that combines the `first_name` and `last_name` columns from the people table using the `CONCAT` function.

- **numbers:** This column contains all of the phone numbers for a given person. It's created using the `STRING_AGG` function, which concatenates all the values of the ph.number column into a single string, separated by commas. The `ORDER BY` clause ensures that the phone numbers are listed in alphabetical order. If a person has no phone numbers, the value of this column is set to `'N/A'` using the `COALESCE` function.

2. **FROM clause:**

```
FROM
  people p
```

This part of the query specifies the main table from which data is being retrieved. In this case, it's the `people` table.

3. **LEFT JOIN clause:**

```
LEFT JOIN
  phones ph
ON
  p.id = ph.user_id
```

This part of the query joins the `phones` table to the `people` table. The `LEFT JOIN` ensures that all rows from the `people` table are included in the result set, regardless of whether they have matching rows in the `phones` table. The join condition is `p.id = ph.user_id`, which means that rows are matched based on the `user_id` column in both tables.

4. **GROUP BY clause:**

```
GROUP BY
  p.id,
  p.first_name,
  p.last_name
```

This part of the query groups the results by the `id`, `first_name`, and `last_name` columns of the `people` table. This ensures that each person has a single entry in the result set, even if they have multiple phone numbers.

5. **ORDER BY clause:**

```
ORDER BY
  p.last_name,
  p.first_name
```

This part of the query sorts the results by the `last_name` and `first_name` columns of the `people` table.
