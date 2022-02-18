import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import "./App.css";
import { UseTodosType, TodosType, SetTodosType, useTodos, toggleTodo, updateTodo, removeTodo, addTodo } from "./store";

const todoData = [
  { id: 1, text: `yooo`, done: false },
  { id: 2, text: `booo`, done: false },
  { id: 3, text: `fooo`, done: false },
  { id: 4, text: `barrr`, done: false },
];

function ListItem({
  todos,
  setTodos,
}: {
  todos: TodosType;
  setTodos: SetTodosType;
}) {
  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox onChange={() => setTodos(toggleTodo(todos, todo.id))} />
          <TextField value={todo.text} onChange={(e) =>setTodos(updateTodo(todos, e.target.value, todo.id))} variant="outlined" size="small" />
          <Button onClick={() => setTodos(removeTodo(todos, todo.id))} variant="outlined">Delete</Button>
        </Grid>
      ))}
    </>
  );
}

function AddItem({ todos, setTodos }: { todos: TodosType; setTodos: SetTodosType }) {
  const [newTodo, setnewTodo] = useState("")
  const handleAdd = () => {
    setTodos(addTodo(todos, newTodo))
    setnewTodo("")
  }
  
  return (
    <Grid container gap={9}>
      <TextField onChange={(e) => setnewTodo(e.target.value)} value={newTodo} variant="outlined" size="small" />
      <Button onClick={handleAdd} variant="outlined">Add Todo</Button>
    </Grid>
  );
}

function App() {
  const [todos, setTodos] = useTodos(todoData);
  console.log(todos);
  
  return (
    <div className="App">
      <Container maxWidth="sm">
        <ListItem todos={todos} setTodos={setTodos} />
        <AddItem todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;
