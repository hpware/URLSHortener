import d from "../db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  //const check = await d`

  //`.execute();
  return {
    slug: slug,
    date: date
  };
});
