import { useState } from "react";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import "./App.css";
//redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, store, todosSelet, toggleTodo, updateTodo } from "./store";

function ListItem() {
  const todos = useSelector(todosSelet);
  const dispatch = useDispatch()

  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <TextField
            value={todo.text}
            onChange={(e) => dispatch(updateTodo({text: e.target.value, id: todo.id})) }
            variant="outlined"
            size="small"
          />
          <Button
            onClick={() => dispatch(removeTodo(todo.id))}
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
  const dispatch = useDispatch()
  const [newTodo, setnewTodo] = useState("");

  const handleAdd = () => {
    dispatch(addTodo(newTodo));
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
  const todos = useSelector(todosSelet);
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
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </div>
);

export default App;
