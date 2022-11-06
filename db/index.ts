import { Pool } from "posgres";
import { config } from "dotenv";

const getEnv = () => {
  if (Deno.env.get("LOCATION") === "production") {
    console.log("for deno deploy");
    return {
      DB_NAME: Deno.env.get("DB_NAME"),
      DB_HOST: Deno.env.get("DB_HOST"),
      DB_USER: Deno.env.get("DB_USER"),
      DB_PASSWORD: Deno.env.get("DB_PASSWORD"),
      DB_PORT: Deno.env.get("DB_PORT"),
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

export const connection = await pool.connect();
