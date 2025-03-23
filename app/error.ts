export default defineNitroErrorHandler(async (error, event) => {
    setHeader(event, "Content-Type", "text/html");
    return send(event, '[custom error handler] ' + error.stack)
})