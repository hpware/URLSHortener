import d from "../db";
import { uuidv7 } from "uuidv7";

export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "application/json");
  try {
    const result = await runsql();
    return {
      sql: result,
      status: "success",
    };
  } catch (error) {
    console.error('Error creating tables:', error);
    return {
      sql: null,
      status: "error",
      message: error.message,
    };
  }
});

async function runsql() {
  const domains = await d`
    create table domains (
      domain text not null primary key,
      isdefault boolean not null,
      created_at timestamp with time zone default current_timestamp
    )
    `
    const links = await d`
    create table links (
      slug text not null primary key,
      domain text not null,
      dest text not null,
      user_id text not null,
      created_at timestamp with time zone default current_timestamp
    );
    `
    const users = await d`
    create table users (
      user_id text not null primary key,
      name text not null,
      email text not null unique,
      pwd text not null,
      created_at timestamp with time zone default current_timestamp
    );
    ` 
    const apikeys = await d`
    create table apikeys (
      apikeys text not null primary key,
      created_user text not null,
      created_at timestamp with time zone default current_timestamp
    );
  `
    const createdefaultuser = await d`
    insert into users (user_id, name, email, pwd, created_at)
    values("${uuidv7()}", "user", "User", "user@example.com", "${new Date().getUTCDate()}");
    `
  return {
    domains_command: domains,
    links_command: links,
    users_command: users,
    apikeys_command: apikeys,
    cretaedefault: createdefaultuser,
  };
}
