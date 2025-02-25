//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "app",
  compatibilityDate: "2025-02-25",
  static: true,
  publicAssets: [
    {
      baseURL: "static",
      dir: "public/static",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  ],
  serveStatic: true,
});