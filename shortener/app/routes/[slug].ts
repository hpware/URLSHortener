import sql from "../db";
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (slug === "") {
    
  }
  return {
    slug: slug,
  };
});
