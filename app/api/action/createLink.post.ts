// d is the short term for db or sql
import d from "~/db";

// Interface
interface bodyi {
  slug: string,
  domain?: string
  dest: string,
  auth: string,
}
export default defineEventHandler(async (event) => {
    setHeader(event, "Content-Type", "application/json");
    const date = new Date();
    // Body using the letter b for well, idk.
    const b : Promise<bodyi> =  await readBody(event);
    if (!b) {
      return {
        status: "error",
        message: "You are required to enter slug, dest, and auth in the body."
      }
    }
    console.log(b);
    if (!b.slug || !b.dest || !b.auth) {
        return {
          status: "error",
          message: "Missing required fields: slug, domain, dest, and auth are required"
        };
      }
    if (!b.domain) {
      const domainreq = await d`
      `

    } else {
      const domain = b.domain;
    }
    const checklink = d`
    
    `.execute();
    console.log(checklink);
    if (checklink) {
      return {
        status: "error",
        message: "This link has been used before has been created before",
      }
    }
    const checkslug = await d`
      select * from links
      where slug='${b.slug}';
    `.execute();
    if (checkslug) {
      return {
        status: "error",
        message: "This slug has been used before, and therefore can not be used again. or you can just delete it I guess."
      }
    }
    const fetchUser = await d`
      
    `.execute();
    console.log(fetchUser);
    const createlink = await d`
      insert into links (slug, domain, dest, user_id, created_at)
      values("${b.slug}", "${b.domain}", "${b.dest}", "${fetchUser.id}", "${date.getUTCDate()}");
    `.execute();
    console.log(createlink);
});
