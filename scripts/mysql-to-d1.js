// One-off: introspect the local MySQL `passpilot` DB and emit SQLite (D1) DDL + data.
// Output: database/d1-schema.sql and database/d1-data.sql
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "database");

function mapType(dataType) {
  const t = dataType.toLowerCase();
  if (["int", "tinyint", "smallint", "mediumint", "bigint", "year"].includes(t)) return "INTEGER";
  if (["decimal", "float", "double", "real", "numeric"].includes(t)) return "REAL";
  if (["blob", "longblob", "mediumblob", "tinyblob", "binary", "varbinary"].includes(t)) return "BLOB";
  return "TEXT"; // varchar, char, text, longtext, enum, set, datetime, date, timestamp, json, etc.
}

function sqlStr(v) {
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function fmtDate(d) {
  // JS Date -> 'YYYY-MM-DD HH:MM:SS' in UTC (matches existing dump convention)
  return d.toISOString().slice(0, 19).replace("T", " ");
}

function valueLiteral(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "NULL";
  if (typeof v === "bigint") return v.toString();
  if (typeof v === "boolean") return v ? "1" : "0";
  if (v instanceof Date) return sqlStr(fmtDate(v));
  if (Buffer.isBuffer(v)) return "X'" + v.toString("hex") + "'";
  if (typeof v === "object") return sqlStr(JSON.stringify(v));
  return sqlStr(v);
}

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "passpilot",
    dateStrings: false,
  });

  const [tableRows] = await conn.query("SHOW TABLES");
  const tableKey = Object.keys(tableRows[0])[0];
  const tables = tableRows.map((r) => r[tableKey]);

  let schema = "PRAGMA foreign_keys=OFF;\n\n";
  let data = "PRAGMA foreign_keys=OFF;\n\n";

  for (const table of tables) {
    const [cols] = await conn.query(
      `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY, EXTRA, COLUMN_DEFAULT
       FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
       ORDER BY ORDINAL_POSITION`,
      [table]
    );

    // Primary key columns (in order)
    const [pkRows] = await conn.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND CONSTRAINT_NAME = 'PRIMARY'
       ORDER BY ORDINAL_POSITION`,
      [table]
    );
    const pkCols = pkRows.map((r) => r.COLUMN_NAME);
    const singleAutoPk =
      pkCols.length === 1 &&
      cols.find((c) => c.COLUMN_NAME === pkCols[0])?.EXTRA?.includes("auto_increment");

    const lines = [];
    for (const c of cols) {
      const type = mapType(c.DATA_TYPE);
      let line = `  \`${c.COLUMN_NAME}\` ${type}`;

      if (singleAutoPk && c.COLUMN_NAME === pkCols[0]) {
        line += " PRIMARY KEY AUTOINCREMENT";
      } else {
        if (c.IS_NULLABLE === "NO") line += " NOT NULL";
        if (c.COLUMN_KEY === "UNI") line += " UNIQUE";
      }

      // Defaults
      let def = c.COLUMN_DEFAULT;
      if (def !== null && def !== undefined && !(singleAutoPk && c.COLUMN_NAME === pkCols[0])) {
        const d = String(def);
        if (/current_timestamp/i.test(d)) {
          line += " DEFAULT CURRENT_TIMESTAMP";
        } else if (type === "INTEGER" || type === "REAL") {
          if (d !== "" && !isNaN(Number(d))) line += ` DEFAULT ${d}`;
        } else {
          line += ` DEFAULT ${sqlStr(d)}`;
        }
      }
      lines.push(line);
    }

    if (!singleAutoPk && pkCols.length > 0) {
      lines.push(`  PRIMARY KEY (${pkCols.map((c) => "`" + c + "`").join(", ")})`);
    }

    schema += `DROP TABLE IF EXISTS \`${table}\`;\n`;
    schema += `CREATE TABLE \`${table}\` (\n${lines.join(",\n")}\n);\n\n`;

    // Data
    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    if (rows.length) {
      const colNames = cols.map((c) => c.COLUMN_NAME);
      const colList = colNames.map((c) => "`" + c + "`").join(", ");
      data += `-- ${table} (${rows.length} rows)\n`;
      for (const row of rows) {
        const vals = colNames.map((c) => valueLiteral(row[c])).join(", ");
        data += `INSERT INTO \`${table}\` (${colList}) VALUES (${vals});\n`;
      }
      data += "\n";
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, "d1-schema.sql"), schema);
  fs.writeFileSync(path.join(OUT_DIR, "d1-data.sql"), data);
  console.log(`Wrote d1-schema.sql (${tables.length} tables) and d1-data.sql`);
  await conn.end();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
