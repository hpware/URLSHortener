export default defineEventHandler(async (event) => {
  const slugtype = getRouterParam(event, "slugtype");
  const slug = getRouterParam(event, "slug");
  return {
    slugtype: slugtype,
    slug: slug,
  };
});
