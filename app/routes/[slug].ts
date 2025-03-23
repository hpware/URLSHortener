import d from "../db";
import date from "~/date";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  //const check = await d`

  //`.execute();
  const getdate = date();
  console.log(getdate);
  return {
    slug: slug,
    date: getdate
  };
});
