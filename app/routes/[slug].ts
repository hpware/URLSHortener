import d from "../db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const date = new Date().getUTCDate();
  //const check = await d`

  //`.execute();
  return {
    slug: slug,
    date: date
  };
});
