import { createContext, useContext, useReducer } from "react"

export interface Todo{
    id: number;
    text: string;
    done: boolean;
}
type ActionType =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: number }
  | { type: "TOGGLE"; payload: number }
  | { type: "UPDATE"; payload: Omit<Todo, "done"> };

//helper finctions
const addTodo = (todos: Todo[], text: string): Todo[] => (
    [...todos, {id: Math.random(), text, done: false }]
)
const removeTodo = (todos: Todo[], id: number): Todo[] => (
    todos.filter(item => item.id !== id)
)
const toggleTodo = (todos: Todo[], id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, done: !item.done} : item)
)
const updateTodo = (todos: Todo[], text: string, id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, text} : item)
)

const todoReducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return addTodo(state, action.payload)
  
      case "REMOVE":
        return removeTodo(state, action.payload)
  
      case "TOGGLE":
        return toggleTodo(state, action.payload)
  
      case "UPDATE":
        return updateTodo(state, action.payload.text, action.payload.id)
  
      default:
        return state;
    }
};
  

export const useTodos = () => {
    const [todos,dispatch] = useReducer(todoReducer, []);

    return {
        todos,
        addTodo(text: string){
            dispatch({type: "ADD", payload: text})
        },
        removeTodo(id: number){
            dispatch({type: "REMOVE", payload: id})
        },
        toggleTodo(id: number){
            dispatch({type: "TOGGLE", payload: id})
        },
        updateTodo(text: string, id: number){
            dispatch({type: "UPDATE", payload: {text, id}})
        }
    }
}


type UsetTodosType = ReturnType<typeof useTodos>


const TodosContext = createContext<UsetTodosType>({} as UsetTodosType);
export const useTodosContext = () =>  useContext(TodosContext);

export const TodosProvider = ({children}: {children: React.ReactNode}) => (
    <TodosContext.Provider value={useTodos()}>
        {children}
    </TodosContext.Provider>
)