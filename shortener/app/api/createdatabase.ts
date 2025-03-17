import sql from "../db";

export default defineEventHandler(async (event) => {
  await sql`
  create table links (
      slug text not null primary key,
      dest text not null,
      user_id text not null,
      created_at timestamp with time zone default current_timestamp
  );`.execute();
  await sql`
  create table users (
      user_id text not null primary key,
      name text not null,
      email text not null unique,
      pwd text not null,
      created_at timestamp with time zone default current_timestamp,
  )
  `.execute();
  await sql`
  
  `.execute();
});
