//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "app",
  compatibilityDate: "2025-02-25",
  errorHandler: "~/error",
  routeRules: {
    "/api/action/": { cors: false },
  },
  experimental: {
    database: true,
  },
});
