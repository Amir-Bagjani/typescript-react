import { createStore } from "redux";
import { ActionTypes, ADD_TODO, DELETE_TODO, SET_NEWTODO, TOGGLE_TODO, UPDATE_TODO } from "./actions";
import { Store, Todo } from "./types";


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

//Redux implementation
const initialStore: Store = {
    todos: [],
    newTodo: ""
}
function todoReducer(state = initialStore, action: ActionTypes){
    switch(action.type){

        case ADD_TODO:
            return {newTodo: "", todos: addTodo(state.todos, state.newTodo)}

        case DELETE_TODO:
            return {...state, todos: removeTodo(state.todos, action.payload)}

        case UPDATE_TODO:
            return {...state, todos: updateTodo(state.todos, action.payload.text, action.payload.id)}

        case TOGGLE_TODO:
            return {...state, todos: toggleTodo(state.todos, action.payload)}

        case SET_NEWTODO:
            return {...state, newTodo: action.payload}

        default:
            return state
    }
}

const store = createStore(todoReducer) 

export default store;