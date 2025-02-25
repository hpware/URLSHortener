//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "app",
  compatibilityDate: "2025-02-25",
  experimental: {
    database: true
  },
  database: {
    default: {
      connector: "sqlite",
      options: {name: "db"}
    },
    users: {
      connector: 'postgresql',
      url: process.env.postgres,
    }
  }
});