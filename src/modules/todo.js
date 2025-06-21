
// This lets todos to hold everything in memory while stores it in factory
import { loadTodos, saveTodos } from './storage.js';
// src/modules/todo.js

// Stores your in-memory store
const todos = [];

//  export createTodo
export function createTodo(text) {
  return {
    id: Date.now().toString(),
    text,
    done: false
  };
}

export function getTodos() {
  return todos;
}

export function addTodo(todo) {
  todos.push(todo);
  saveTodos(todos);
}

export function removeTodo(id) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx > -1) todos.splice(idx, 1);
}

export function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
}
