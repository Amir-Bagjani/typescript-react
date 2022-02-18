import { createContext, useState, useContext } from "react"


export interface Todo{
    id: number;
    text: string;
    done: boolean;
}

//helper finctions
export const addTodo = (todos: Todo[], text: string): Todo[] => (
    [...todos, {id: Math.random(), text, done: false }]
)
export const removeTodo = (todos: Todo[], id: number): Todo[] => (
    todos.filter(item => item.id !== id)
)
export const toggleTodo = (todos: Todo[], id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, done: !item.done} : item)
)
export const updateTodo = (todos: Todo[], text: string, id: number): Todo[] => (
    todos.map(item => item.id === id ? {...item, text} : item)
)


//implement todos context
export const useTodos = (initial: Todo[]) => useState<Todo[]>(initial)
type UsetTodosType = ReturnType<typeof useTodos>


const TodosContext = createContext<UsetTodosType>({} as UsetTodosType);
export const useTodosContext = () =>  useContext(TodosContext);

export const TodosProvider = ({children}: {children: React.ReactNode}) => (
    <TodosContext.Provider value={useTodos([])}>
        {children}
    </TodosContext.Provider>
)

