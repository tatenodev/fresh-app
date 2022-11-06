import { connection } from "../index.ts";

export const createTodosTable = async () => {
  try {
    await connection.queryObject`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    )
  `;
  } catch (err) {
    console.error("err:", err);
  } finally {
    connection.release();
  }
};

const ErrorResponse = (err: Error): Response => {
  console.error(err);
  return new Response(`Internal Server Error\n\n${err.message}`, {
    status: 500,
  });
};

export const addTodo = async (req: Request): Promise<Response> => {
  try {
    const { title } = await req.json().catch(() => null);
    console.log("title: ", title);
    if (typeof title !== "string" || title.length > 256) {
      return new Response("Bad Request!!", { status: 400 });
    }
    await connection.queryObject`
      INSERT INTO todos (title) VALUES (${title})
    `;
    return new Response("", { status: 201 });
  } catch (err) {
    return ErrorResponse(err);
  } finally {
    connection.release();
  }
};

export const getTodos = async (): Promise<Response> => {
  try {
    const result = await connection.queryObject`
      SELECT * FROM todos
    `;
    const body = JSON.stringify(result.rows, null, 2);

    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return ErrorResponse(err);
  } finally {
    connection.release();
  }
};
