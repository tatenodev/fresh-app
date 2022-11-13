import { deleteCookie } from "https://deno.land/std@0.160.0/http/cookie.ts";
import { Handlers } from "https://deno.land/x/fresh@1.1.2/server.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    deleteCookie(headers, "auth", { path: "/", domain: url.hostname });

    headers.set("location", "/");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
