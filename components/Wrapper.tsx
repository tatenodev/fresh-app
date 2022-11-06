import Counter from "../islands/Counter.tsx";

export default function Wrapper() {
  return (
    <div>
      Counter:{" "}
      <div>
        <Counter start={5} />
      </div>
    </div>
  );
}
