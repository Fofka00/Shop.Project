import { createConnection, Connection } from "mysql2/promise";
import 'dotenv/config'

export async function initDataBase(): Promise<Connection | null> {
  let connection: Connection | null = null;

  try {
    connection = await createConnection({
      host: 'localhost',
      port: 3306,
      password: '4525',
      user: 'root',
      database: 'ProductsApplication'
    });
  } catch (e) {
    console.error(e.message || e);
    return null;
  }

  console.log(`Connection to DB ProductsApplication established`);

  return connection;
}
