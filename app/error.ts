export default defineNitroErrorHandler(async (error, event) => {
    setHeader(event, "Content-Type", "text/html");
    const statusCode = error.statusCode || 500;
    const isDev = process.env.NODE_ENV === 'development';
    const allowedHosts = ['localhost', 'dev.zeabur.app'];
    
    // Enhanced error messages
    const errorMessages = {
        404: {
            title: "Page Not Found",
            message: "The URL you're looking for doesn't exist"
        },
        500: {
            title: "Server Error",
            message: "We're experiencing technical difficulties"
        },
        403: {
            title: "Access Denied",
            message: "You don't have permission to access this resource"
        }
    };
    
    const { title, message } = errorMessages[statusCode] || errorMessages[500];
    
    const sanitizeErrorMessage = (msg: string) => {
        return isDev ? msg : 'An error occurred';
    };

    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="robots" content="noindex, nofollow">
                <title>${title} - Error ${statusCode}</title>
                <style>
                    :root {
                        --primary-color: #4299e1;
                        --error-color: #e53e3e;
                        --bg-color: #f4f5f7;
                        --text-color: #333;
                    }
                    
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --primary-color: #63b3ed;
                            --error-color: #fc8181;
                            --bg-color: #1a202c;
                            --text-color:rgb(0, 0, 0);
                        }
                        body {
                            background: var(--bg-color);
                            color: var(--text-color);
                        }
                        .error-container {
                            background: #2d3748;
                        }
                        .details {
                            background: #1a202c;
                        }
                    }
                    
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: var(--bg-color);
                        margin: 0;
                        padding: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        color: var(--text-color);
                    }
                    .error-container {
                        background: white;
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        max-width: 600px;
                        width: 100%;
                        font-color: black;
                    }
                    h1 {
                        margin: 0;
                        font-size: 2.5rem;
                        color: var(--error-color);
                    }
                    .status-code {
                        font-size: 1.2rem;
                        color: #718096;
                        margin-bottom: 1rem;
                    }
                    .message {
                        font-size: 1.1rem;
                        margin: 1rem 0;
                        line-height: 1.5;
                    }
                    .details {
                        background: #f8f9fa;
                        padding: 1rem;
                        border-radius: 8px;
                        margin: 1rem 0;
                        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                        font-size: 0.9rem;
                        overflow-x: auto;
                    }
                    .button-group {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1.5rem;
                        flex-wrap: wrap;
                    }
                    button {
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: all 0.2s ease;
                        flex: 1;
                        min-width: 140px;
                    }
                    button:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .back-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: var(--primary-color);
                        text-decoration: none;
                        font-weight: 500;
                    }
                    .back-link:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>${title}</h1>
                    <div class="status-code">Error ${statusCode}</div>
                    <p class="message">${message}</p>
                    
                    ${isDev || allowedHosts.includes(event.node.req.headers.host || '') ? `
                        <div class="details">
                            <strong>Error Details:</strong>
                            <pre>${sanitizeErrorMessage(error.message) || 'No additional details available'}</pre>
                        </div>
                        
                        ${isDev ? `
                            <div class="details">
                                <strong>Stack Trace:</strong>
                                <pre>${error.stack || 'No stack trace available'}</pre>
                            </div>
                        ` : ''}
                    ` : ''}
                    
                    <div class="button-group">
                        <button onclick="history.back()">← Go Back</button>
                        <button onclick="window.location.href='mailto:hw@yuanhau.com?subject=${encodeURIComponent(`Error Report - ${statusCode} on ${event.node.req.headers.host}`)}&body=${encodeURIComponent(`Error Details:
                            
Page: ${event.node.req.url}
Error Code: ${statusCode}
Timestamp: ${new Date().toISOString()}
User Agent: ${event.node.req.headers['user-agent']}
${isDev ? `\nStack Trace: ${error.stack}` : ''}`)}'">
                            Report Issue
                        </button>
                    </div>
                </div>

                <script>
                    // Prevent error details from showing in production except on allowed hosts
                    const allowedHosts = ${JSON.stringify(allowedHosts)};
                    if (!allowedHosts.includes(window.location.hostname)) {
                        document.querySelectorAll('.details').forEach(el => el.remove());
                    }
                </script>
            </body>
        </html>
    `;
    
    return send(event, html);
});