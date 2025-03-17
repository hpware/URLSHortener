import postgres from "postgres";

const db = postgres('postgresql://data:data144donotexpose@10.2.0.22:5432/shortener', {
    host: '10.2.0.22', 
    port: 5432,
    database: 'shortener',
    username : 'data',
    password: 'data144donotexpose',          
  });

export default db;