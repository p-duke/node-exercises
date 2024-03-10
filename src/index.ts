// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ROUTES
// create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await db.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);
  } catch(e: any) {
    console.error(e.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo;");
    res.json(allTodos.rows);
  } catch(e) {
    console.error(e.message);
  }
});

// get a todo
app.get("/todos/:todoId", async (req, res) => {
  try {
    const todo = await db.query("SELECT * FROM todo where todo_id = $1", [req.params.todoId]);
    res.json(todo.rows);
  } catch(e) {
    console.log(e.message);
  }
});

// update a todo
app.put("/todos/:todoId", async (req, res) => {
  try {
    const { body } = req;
    console.log("body", body);
    await db.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [body.description, req.params.todoId]
    );

    const todo = await db.query("SELECT * FROM todo where todo_id = $1", [req.params.todoId]);
    res.json(todo.rows);
  } catch(e) {
    console.log(e.message);
  }
});

// delete a todo
app.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    await db.query("DELETE FROM todo WHERE todo_id = $1", [todoId]);
    res.json(`Deleted ${todoId} from todo table`);
  } catch(e) {
    console.log(e.message);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
