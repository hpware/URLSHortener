export default async function fetchDate() {
    const date = new Date();
    const returninfo = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    return returninfo;
}