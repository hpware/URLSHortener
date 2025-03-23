import d from "../db";
import date from "~/date";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  //const check = await d`

  //`.execute();
  return {
    slug: slug,
    date: date()
  };
});
