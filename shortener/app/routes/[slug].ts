export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  return {
    slug: slug,
  };
});
