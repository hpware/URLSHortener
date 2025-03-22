import d from "../db";

export default defineEventHandler(async (event) => {
  let dbcreated = false;
  setHeader(event, "Content-Type", "application/json");
  const preventsql = await d`
  create table prevent (
    prevent text not null primary key,
  )
  `.execute().error(dbcreated = true);
  if (dbcreated = false) {
    return {
      sql: runsql(),
      status: "success",
    }
  } else {
    return {
      sql: "Database created before!",
      status: "error",
    }
  }
});

async function runsql() {
  const query = await d`
  create table domains (
    domain text not null primary key,
    default boolean not null,
    created_at timestamp with time zone default current_timestamp,
  );
  create table links (
      slug text not null primary key,
      domain txt not null,
      dest text not null,
      user_id text not null,
      created_at timestamp with time zone default current_timestamp
  );
  create table users (
      user_id text not null primary key,
      name text not null,
      email text not null unique,
      pwd text not null,
      created_at timestamp with time zone default current_timestamp
  );
  create table apikeys (
      apikeys text not null primary key,
      created_user text not null,
      created_at timestamp with time zone default current_timestamp
  );`.execute();
  return query;
}