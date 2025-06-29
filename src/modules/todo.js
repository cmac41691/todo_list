
// This lets todos to hold everything in memory while stores it in factory
import { loadTodos, saveTodos } from './storage.js';
import { renderTodos } from './ui.js';

// src/modules/todo.js

// Stores your in-memory store
const todos = loadTodos();

/**
 * A facory for a new todo
 * @param {'all'|'today'|'overdue'|'upcoming'} when 
 * 
 */

export function filterTodosByDueDates(when){
const todos = getTodos();
const today = new Date().toISOString().slice(0, 10);

switch (when) {
  case 'today':
    return todos.filter()
  case 'overdue':
    return todos.filter()
  case 'upcoming':
    return todos.filter()
case 'all':
    break;
  default:
    return todos;
  }

}

//  export createTodo
export function createTodo(text, dueDate) {
  return {
    id: Date.now().toString(),
    text,
    done: false,
    dueDate,
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