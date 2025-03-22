import postgres from "postgres";

const db = postgres(
  process.env.postgres,
);

export default db;
