import { PageProps } from "$fresh/server.ts";
import CounterNonIsland from "../../components/CounterNonIsland.tsx";
import Wrapper from "../../components/Wrapper.tsx";

export default function Greet(props: PageProps) {
  return (
    <div>
      counter: <Wrapper />
      counter(none islands): <CounterNonIsland start={5} />
    </div>
  );
}
