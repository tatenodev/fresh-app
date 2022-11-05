import { Database, PostgresConnector } from "denodb";
import { config } from "dotenv";

const getEnv = () => {
  if (Deno.hostname() === "tatenodev-fresh-app.deno.dev") {
    // for deno deploy
    return {
      DB_NAME: Deno.env.get("DB_NAME"),
      DB_HOST: Deno.env.get("DB_NAME"),
      DB_USER: Deno.env.get("DB_NAME"),
      DB_PASSWORD: Deno.env.get("DB_NAME"),
      DB_PORT: Deno.env.get("DB_NAME"),
    };
  } else {
    // for local
    return config();
  }
};

const env = await getEnv();

const connector = new PostgresConnector({
  database: env.DB_NAME ?? "",
  host: env.DB_HOST ?? "",
  username: env.DB_USER ?? "",
  password: env.DB_PASSWORD ?? "",
  port: Number(env.DB_PORT) ?? 0,
});

export const db = new Database(connector);
