
// This lets todos to hold everything in memory while stores it in factory
import { loadTodos, saveTodos } from './storage.js';
import { renderTodos } from './ui.js';

// src/modules/todo.js

// Stores your in-memory store
const todos = loadTodos();

/**
 * A facory for a new todo
 * @param {string} text 
 * 
 */

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
  renderTodos();
}

export function removeTodo(id) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx > -1) todos.splice(idx, 1);
  saveTodos(todos);
  renderTodos();

}

export function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  saveTodos(todos);
  renderTodos();
}

export function updateTodoText(id, newText){
  const t = todos.find(t => t.id === id);
  if(!t) return;
  t.text = newText;
  saveTodos(todos);
  renderTodos();
}
// render will be initial
renderTodos();