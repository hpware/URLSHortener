export default defineNitroErrorHandler(async (error, event) => {
    setHeader(event, "Content-Type", "text/html")
    const title = "Oops! 404"
    const title2 = "This URL does not to appear to go anywhere"
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta name=""
            </head>
            <body>
                <h1>${title}</h1>
                <h2>${title2}</h2>
                <h4>Your event</h4>
                <p>${JSON.stringify(event)}</p>
                <h4>Your error message</h4>
                <p>${error.stack}</p>
                <button>Submit your problem to your web admin.</button>
            </body>
        </html>
    `
    return send(event, html);
})