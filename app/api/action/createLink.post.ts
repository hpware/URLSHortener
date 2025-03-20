// d is the short term for db or sql
import d from "~/db";

export default defineEventHandler(async (event) => {
    setHeader(event, "Content-Type", "application/json");
    const b = await readRawBody(event);
    console.log(b);
    if (!b.slug || !b.domain || !b.dest || !b.auth) {
        return {
          status: "error",
          message: "Missing required fields: slug, domain, dest, and auth are required"
        };
      }
    const checklink = d`
    
    `
    if (checklink)
});
