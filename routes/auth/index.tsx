import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
    // only auth user
    // if (cookies.auth === "bar") {
    //   return ctx.render!();
    // } else {
    //   const url = new URL(req.url);
    //   url.pathname = "/secret";
    //   return Response.redirect(url);
    // }
  },
};

export default function Home({ data }: PageProps<Data>) {
  // https://deno.com/blog/setup-auth-with-fresh
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
      {!data.isAllowed ? <Login /> : <a href="/api/logout">Logout</a>}
    </div>
  );
}

function Login() {
  return (
    <form method="post" action="/api/login">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
