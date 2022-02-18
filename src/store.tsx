import { useState } from "react"

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

export const useTodos = (initial: Todo[]) => useState<Todo[]>(initial)
export type UseTodosType = ReturnType<typeof useTodos>
export type TodosType = UseTodosType[0]
export type SetTodosType = UseTodosType[1]