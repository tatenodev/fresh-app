import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function CounterNonIsland(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  const [index, setIndex] = useState("0");
  const [hoge, setHoge] = useState("none");
  const [todos, setTodos] = useState([]);

  const onFetch = async () => {
    const res = await fetch(`api/${index}`);
    setHoge(await res.text());
  };

  const addTodo = async () => {
    const res = await fetch("api/add_todo", {
      method: "POST",
      body: JSON.stringify({ title: "hoge text" }),
    });
    console.log("res", res);
  };

  const getTodos = async () => {
    const res = await fetch("api/get_todos");
    const data = await res.json() as [];
    setTodos(data);
  };

  return (
    <>
      <button onClick={addTodo}>add todo</button>
      <button onClick={getTodos}>get todos</button>
      <div>resut: {JSON.stringify(todos)}</div>
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
