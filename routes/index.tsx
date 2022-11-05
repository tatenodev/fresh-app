import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { handler as jokeHandler } from "./api/joke.ts";

export const handler: Handlers<string> = {
  async GET(req, ctx) {
    const res: Response = await jokeHandler(req, ctx);
    return ctx.render(await res.text());
  },
};

export default function Home({ data }: PageProps<string>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          Hello World.
        </p>
        <Counter start={3} />
      </div>
      <p>joke: {data}</p>
    </>
  );
}
