// d is the short term for db or sql
import d from "~/db";
// Interface
interface bodyi {
  slug: string,
  domain?: string
  dest: string,
  auth: string,
}

let domain = "";

export default defineEventHandler(async (event) => {
    setHeader(event, "Content-Type", "application/json");
    // Body using the letter b for well, idk.
    const b : bodyi =  await readBody(event);
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
      const fetchUser = await d`
        select * from apikeys
        where apikeys=${b.auth};
      `
      console.log(fetchUser);
    if (!b.domain) {
      const domainreq = await d`
      select domain from domains
      where isdefault=true;
      `
      domain = String(domainreq);
    } else {
      domain = b.domain;
    }
    const checklink = d`
      select * from links
      where dest=${b.dest};
    `
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
    `
    if (checkslug) {
      return {
        status: "error",
        message: "This slug has been used before, and therefore can not be used again. or you can just delete it I guess."
      }
    }
    const logactivty = await d`
    create table ${slug} (
      uuid text not null primary key,
      user_agent text not null,
      ip_addr text not null,
      params text not null,
      click_timestamp timestamp with time zone default current_timestamp
    )`
    const getdate = new Date().toISOString()  
    //const createlink = await d`
    //  insert into links (slug, domain, dest, user_id, created_at)
    //  values("${b.slug}", "${b.domain}", "${b.dest}", "${fetchUser.id}", "${getdate}");
    //`
    console.log(createlink);
    return {
      date:getdate,
      data: {
        slug: b.slug,
        domain: b.domain,
        dest: b.dest,
      },
      database: {
        fetchUser: fetchUser,
        domainreq: domain,
        checkslug: checkslug,
        logactivty: logactivty,
        createlink: "// TODO"
      }
    }
});
