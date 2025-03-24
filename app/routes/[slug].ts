import d from "../db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  //const check = await d`

  //`.execute();
  const date = new Date().toISOString();
  return {
    slug: slug,
    date: date
  };
});
