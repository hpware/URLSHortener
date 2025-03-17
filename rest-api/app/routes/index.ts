export default defineEventHandler(async (event) => {
    return sendRedirect(event, "/docs/", 302);
})