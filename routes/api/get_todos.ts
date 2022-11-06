import { Handlers } from "$fresh/server.ts";
import { getTodos } from "../../db/todos/index.ts";

export const handler: Handlers = {
  async GET() {
    const res = await getTodos();
    return res;
  },
};
