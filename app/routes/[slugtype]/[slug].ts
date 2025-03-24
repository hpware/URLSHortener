import d from "~/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const check = await d`
  select dest from links
  where slug=${slug}
  `
  const date = new Date().toISOString();
  return {
    slug: slug,
    date: date,
    db: check
  };
});
