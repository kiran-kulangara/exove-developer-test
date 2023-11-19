import { postgres } from "../deps.js";

const sql = postgres("postgres://username:password@localhost:5432/database", {
  host: "localhost", // Postgres ip address[es] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: "database", // Name of database to connect to
  username: "username", // Username of database user
  password: "password", // Password of database user
});

export { sql };
