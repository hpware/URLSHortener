import d from "~/db";
import de from "~/date";


export default defineEventHandler (async (event) => {
    let dbwrite = false;
    let dbread = false;
    const date = await de();
    const sqlwrite = await d`
    insert into databasecheck(date)
    values(${date});
    `
    const sqlread = await d`
    select * from databasecheck
    where date=${date};
    `
    if (sqlwrite) dbwrite = true
    else dbwrite = false
    if (sqlread) dbread = true
    else dbread = false
    return {
        server: true,
        database: {
            write: dbwrite,
            read: dbread,
        },
    }
})