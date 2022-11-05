import { Handlers } from "$fresh/server.ts";
import { createTodoTable } from "../../db/index.ts";

// ちゃんと読め！
// https://fresh.deno.dev/docs/concepts/routes#:~:text=handler%27s%20render%20function.-,Handler%20route,-Let%27s%20look%20at

export const handler: Handlers = {
  POST() {
    const res = new Response("success", {
      status: 200,
    });
    console.log("success");

    createTodoTable();

    return res;
  },
};
