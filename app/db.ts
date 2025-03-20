import postgres from "postgres";

const db = postgres(
  "postgresql://postgres:data144donotexpose@10.2.0.90:5433/shortener",
  {
    host: "10.2.0.90",
    port: 5433,
    database: "shortener",
    username: "postgres",
    password: "data144donotexpose",
  },
);

export default db;
