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
  const {todos, toggleTodo, updateTodo, removeTodo} = useTodosContext();
  return (
    <>
      {todos.map((todo) => (
        <Grid container gap={2} style={{ margin: `1rem` }} key={todo.id}>
          <Checkbox onChange={() => toggleTodo(todo.id)} />
          <TextField
            value={todo.text}
            onChange={(e) =>
              updateTodo(e.target.value, todo.id)
            }
            variant="outlined"
            size="small"
          />
          <Button
            onClick={() => removeTodo(todo.id)}
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
  const {addTodo, setNewTodo, newTodo} = useTodosContext();

  return (
    <Grid container gap={9}>
      <TextField
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        variant="outlined"
        size="small"
      />
      <Button onClick={addTodo} variant="outlined">
        Add Todo
      </Button>
    </Grid>
  );
}

function AppWrapper() {
  const {todos} = useTodosContext();
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