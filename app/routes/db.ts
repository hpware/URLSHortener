export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readRawBody(event);
  const tssting = String(body).trim();
  console.log(body);
  try {
    // Use
    const result = await db.exec(`${tssting}`);
    return { success: true, result };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
});
