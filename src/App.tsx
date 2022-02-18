import React, { useState } from "react";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import "./App.css";
import {
  toggleTodo,
  updateTodo,
  removeTodo,
  addTodo,
  TodosProvider,
  useTodosContext,
} from "./store";

function ListItem() {
  const [todos, setTodos] = useTodosContext();
  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox onChange={() => setTodos(toggleTodo(todos, todo.id))} />
          <TextField
            value={todo.text}
            onChange={(e) =>
              setTodos(updateTodo(todos, e.target.value, todo.id))
            }
            variant="outlined"
            size="small"
          />
          <Button
            onClick={() => setTodos(removeTodo(todos, todo.id))}
            variant="outlined"
          >
            Delete
          </Button>
        </Grid>
      ))}
    </>
  );
}

function AddItem() {
  const [todos, setTodos] = useTodosContext();
  const [newTodo, setnewTodo] = useState("");
  const handleAdd = () => {
    setTodos(addTodo(todos, newTodo));
    setnewTodo("");
  };

  return (
    <Grid container gap={9}>
      <TextField
        onChange={(e) => setnewTodo(e.target.value)}
        value={newTodo}
        variant="outlined"
        size="small"
      />
      <Button onClick={handleAdd} variant="outlined">
        Add Todo
      </Button>
    </Grid>
  );
}

function AppWrapper() {
  const [todos] = useTodosContext();
  console.log(todos);

  return (
    <>
      <Container maxWidth="sm">
        <ListItem />
        <AddItem />
      </Container>
    </>
  );
}
const App = () => (
  <div className="App">
    <TodosProvider>
      <AppWrapper />
    </TodosProvider>
  </div>
)


export default App;
