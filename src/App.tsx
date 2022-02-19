import { TodosProvider, useTodosContext } from "./store";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import "./App.css";
import { useState } from "react";

function ListItem() {
  const { todos, toggleTodo, updateTodo, removeTodo } = useTodosContext();
  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox onChange={() => toggleTodo(todo.id)} />
          <TextField
            value={todo.text}
            onChange={(e) => updateTodo(e.target.value, todo.id)}
            variant="outlined"
            size="small"
          />
          <Button onClick={() => removeTodo(todo.id)} variant="outlined">
            Delete
          </Button>
        </Grid>
      ))}
    </>
  );
}

function AddItem() {
  const { addTodo } = useTodosContext();
  const [newTodo, setNewTodo] = useState("");

  return (
    <Grid container gap={9}>
      <TextField
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        variant="outlined"
        size="small"
      />
      <Button
        onClick={() => {
          addTodo(newTodo);
          setNewTodo("");
        }}
        variant="outlined"
      >
        Add Todo
      </Button>
    </Grid>
  );
}

function AppWrapper() {
  const { todos } = useTodosContext();
  console.log(todos);

  return (
    <Container maxWidth="sm">
      <ListItem />
      <AddItem />
    </Container>
  );
}
const App = () => (
  <div className="App">
    <TodosProvider>
      <AppWrapper />
    </TodosProvider>
  </div>
);

export default App;
