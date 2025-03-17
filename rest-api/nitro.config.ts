//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "app",
  compatibilityDate: "2025-02-25",
  experimental: {
    database: true,
    openAPI: true,
  },
  openAPI: {
    route: "/_docs/openapi.json",
    production: "prerender",
    meta: {
      title: "URL Shortener API Documentation",
      description: "Access Scalar using /docs and Swagger using /docs/swagger",
      version: "1.0",
    },
    ui: {
      scalar: {
        route: "/docs/",
        theme: "blue",
      },
      swagger: {
        route: "/docs/swagger",
      },
    },
  },
});
