import mysql, { ResultSetHeader } from "mysql2/promise";

declare global {
  var __passpilotMysqlPool: mysql.Pool | undefined;
}

const pool =
  global.__passpilotMysqlPool ||
  mysql.createPool({
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "passpilot",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true,
  });

if (process.env.NODE_ENV !== "production") {
  global.__passpilotMysqlPool = pool;
}

export async function query<T = any>(sql: string, params?: any[]) {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params?: any[]): Promise<ResultSetHeader> {
  const [result] = await pool.execute<ResultSetHeader>(sql, params);
  return result;
}

export default pool;
