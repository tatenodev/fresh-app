import { Pool } from "posgres";
import { config } from "dotenv";

const getEnv = () => {
  if (Deno.hostname() === "tatenodev-fresh-app.deno.dev") {
    console.log("for deno deploy");
    return {
      DB_NAME: Deno.env.get("DB_NAME"),
      DB_HOST: Deno.env.get("DB_NAME"),
      DB_USER: Deno.env.get("DB_NAME"),
      DB_PASSWORD: Deno.env.get("DB_NAME"),
      DB_PORT: Deno.env.get("DB_NAME"),
    };
  } else {
    console.log("for local");
    return config();
  }
};

const env = await getEnv();

const pool = new Pool(
  {
    database: env.DB_NAME,
    hostname: env.DB_HOST,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    user: env.DB_USER,
  },
  10,
  true,
);

const connection = await pool.connect();

export const createTodoTable = async () => {
  try {
    await connection.queryObject`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    )
  `;
  } catch (err) {
    console.log("err", err);
    throw err;
  } finally {
    connection.release();
  }
};