import sql from "../db";

export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "application/json");
  const linksql = await sql`
  create table links (
      slug text not null primary key,
      dest text not null,
      user_id text not null,
      created_at timestamp with time zone default current_timestamp
  );`.execute();
  const usersql = await sql`
  create table users (
      user_id text not null primary key,
      name text not null,
      email text not null unique,
      pwd text not null,
      created_at timestamp with time zone default current_timestamp
  )
  `.execute();
  const apikeysql = await sql`
  create table apikeys (
      apikeys text not null primary key,
      created_user text not null,
      created_at timestamp with time zone default current_timestamp
  )
  `.execute();
  return {
    page: "Run SQL Commands",
    links: linksql,
    user: usersql,
    apikeys: apikeysql,
  };
});
