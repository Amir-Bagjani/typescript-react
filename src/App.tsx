import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, removeTodo, setNewTodo, toggleTodo, updateTodo } from "./store/actions";
import store from "./store/store";

//type
import { Store } from './store/types'

function ListItem() {
  const todos = useSelector((state: Store) => state.todos)
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
            onChange={(e) => dispatch(updateTodo(todo.id, todo.text))}
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
  const newTodo = useSelector((state: Store) => state.newTodo)
  const dispatch = useDispatch()

  return (
    <Grid container gap={9}>
      <TextField
        onChange={(e) => dispatch(setNewTodo(e.target.value))}
        value={newTodo}
        variant="outlined"
        size="small"
      />
      <Button onClick={() => dispatch(addTodo())} variant="outlined">
        Add Todo
      </Button>
    </Grid>
  );
}

function AppWrapper() {
  const todos = useSelector((state: Store) => state.todos)
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