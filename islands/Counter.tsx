import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  const [index, setIndex] = useState("0");
  const [hoge, setHoge] = useState("none");

  const onFetch = async () => {
    const { origin } = location;
    const res = await fetch(`${origin}/api/${index}`);
    setHoge(await res.text());
  };

  return (
    <>
      <div>
        <p>{count}</p>
        <Button onClick={() => setCount(count - 1)}>-1</Button>
        <Button onClick={() => setCount(count + 1)}>+1</Button>
      </div>
      <div>
        index:{" "}
        <input
          type="number"
          value={index}
          onChange={(e) => setIndex(e.currentTarget.value)}
        />
        <Button onClick={onFetch}>Fetch</Button>
        Result: {hoge}
      </div>
    </>
  );
}
