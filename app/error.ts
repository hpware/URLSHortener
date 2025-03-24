export default defineNitroErrorHandler(async (error, event) => {
    setHeader(event, "Content-Type", "text/html");
    const statusCode = error.statusCode || 500;
    const title = statusCode === 404 ? "Page Not Found" : "Something Went Wrong";
    const message = statusCode === 404 
        ? "The URL you're looking for doesn't exist" 
        : "We're experiencing technical difficulties";

    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title} - Error ${statusCode}</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: #f4f5f7;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        color: #333;
                    }
                    .error-container {
                        background: white;
                        padding: 2rem;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        max-width: 600px;
                        width: 90%;
                    }
                    h1 {
                        margin: 0;
                        font-size: 2.5rem;
                        color: #e53e3e;
                    }
                    .status-code {
                        font-size: 1.2rem;
                        color: #718096;
                        margin-bottom: 1rem;
                    }
                    .message {
                        font-size: 1.1rem;
                        margin: 1rem 0;
                    }
                    .details {
                        background: #f8f9fa;
                        padding: 1rem;
                        border-radius: 4px;
                        margin: 1rem 0;
                        font-family: monospace;
                        font-size: 0.9rem;
                        overflow-x: auto;
                    }
                    button {
                        background: #4299e1;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background 0.2s;
                    }
                    button:hover {
                        background: #3182ce;
                    }
                    .back-link {
                        display: block;
                        margin-top: 1rem;
                        color: #4299e1;
                        text-decoration: none;
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
                    
                    <div class="details">
                        <strong>Error Details:</strong>
                        <pre>${error.message || 'No additional details available'}</pre>
                    </div>

                    ${process.env.NODE_ENV === 'development' ? `
                        <div class="details">
                            <strong>Stack Trace:</strong>
                            <pre>${error.stack || 'No stack trace available'}</pre>
                        </div>
                    ` : ''}
                    
                    <button onclick="window.location.href='mailto:admin@example.com?subject=Error%20Report&body=Error%20on%20page:%20${encodeURIComponent(event.path)}%0D%0AError%20code:%20${statusCode}%0D%0ATimestamp:%20${new Date().toISOString()}'">
                        Report this issue
                    </button>
                    
                    <a href="/" class="back-link">← Return to homepage</a>
                </div>

                <script>
                    if (window.location.hostname !== 'localhost') {
                        document.querySelectorAll('.details').forEach(el => {
                            if (!el.textContent.includes('Error Details:')) {
                                el.style.display = 'none';
                            }
                        });
                    }
                </script>
            </body>
        </html>
    `;
    
    return send(event, html);
});