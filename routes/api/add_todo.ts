import { Handlers } from "$fresh/server.ts";
import { addTodo } from "../../db/todos/index.ts";

export const handler: Handlers = {
  async POST(req) {
    const res = await addTodo(req);
    return res;
  },
};
