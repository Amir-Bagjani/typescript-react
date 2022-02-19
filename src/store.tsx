import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit" 

export interface Todo{
    id: number;
    text: string;
    done: boolean;
}
interface InitialStateType {
    todos: Todo[]
}

//helper functions
const addTodos = (todos: Todo[], text: string): Todo[] => (
    [...todos, {id: Math.random(), text, done: false }]
)
const removeTodos = (todos: Todo[], id: number): Todo[] => (
    todos.filter(item => item.id !== id)
)
const toggleTodos = (todos: Todo[], id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, done: !item.done} : item)
)
const updateTodos = (todos: Todo[], text: string, id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, text} : item)
)


const initialState: InitialStateType = {
    todos: []
}

//slice
const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo : (state, action: PayloadAction<string> ) => {
            state.todos = addTodos(state.todos, action.payload)
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = removeTodos(state.todos, action.payload)
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            state.todos = toggleTodos(state.todos, action.payload)
        },
        updateTodo: (state, action: PayloadAction<Omit<Todo, 'done'>>) => {
            state.todos = updateTodos(state.todos, action.payload.text, action.payload.id)
        }
    }
})
export const { addTodo, removeTodo, toggleTodo, updateTodo } = todosSlice.actions


//store
export const store = configureStore({
    reducer: {
        todos: todosSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>
export const todosSelet = (state: RootState) => state.todos.todos;
