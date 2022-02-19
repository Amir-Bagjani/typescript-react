import React, { useState } from "react";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import "./App.css";
import { useTodosReducer, DispatchTodosType, TodosType } from "./store";

function ListItem({todos, dispatch}: {todos: TodosType, dispatch:DispatchTodosType}) {
  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox
            onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
          />
          <TextField
            value={todo.text}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                payload: { id: todo.id, text: e.target.value },
              })
            }
            variant="outlined"
            size="small"
          />
          <Button
            onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}
            variant="outlined"
          >
            Delete
          </Button>
        </Grid>
      ))}
    </>
  );
}

function AddItem({dispatch}: {dispatch:DispatchTodosType}) {
  const [newTodo, setnewTodo] = useState("");
  const handleAdd = () => {
    dispatch({type: "ADD", payload: newTodo})
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

function App() {
  const [todos, dispatch] = useTodosReducer();
  console.log(todos);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <ListItem todos={todos} dispatch={dispatch} />
        <AddItem dispatch={dispatch} />
      </Container>
    </div>
  );
}

export default App;
