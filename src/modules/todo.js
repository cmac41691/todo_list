// src/modules/todo.js
import { loadTodos, saveTodos } from './storage.js';
import { renderTodos } from './ui.js';

// keep the array live in memory
const todos = loadTodos();

/** Always get the live list */
export function getTodos() {
  return todos;
}

/** Create a new Todo */
export function createTodo(text, dueDate) {
  return { id: Date.now().toString(), text, done: false, dueDate };
}

/** Add, remove, toggle, edit text… unchanged **/
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

export function updateTodoText(id, newText) {
  const t = todos.find(t => t.id === id);
  if (t) {
    t.text = newText;
    saveTodos(todos);
    renderTodos();
  }
}

export function updateTodoDueDate(id, newDate) {
  const t = todos.find(t => t.id === id);
  if (t) {
    t.dueDate = newDate;
    saveTodos(todos);
    renderTodos();
  }
}

/** FILTER BUILDER  */
export function filterTodosByDueDates(when) {
  const all = getTodos();
  const today = new Date().toISOString().slice(0, 10);
  switch (when) {
    case 'today':
      return all.filter(t => t.dueDate === today);

    case 'overdue':
      return all.filter(t => t.dueDate && t.dueDate < today);

    case 'upcoming':

      return all.filter(t => t.dueDate && t.dueDate > today);
  case 'all':  
     default:           
    return all;
  }
}
    

/** SORT BUILDER  */
export function sortTodosByDueDate(list = getTodos(), order = 'none') {
  if (order === 'none') return list;

  // copy so we don’t mutate the original array
  const arr = [...list];
  return arr.sort((a, b) => {
    // push missing dates to the bottom
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    // lexicographic compare works on YYYY-MM-DD
    return order === 'asc'
      ? a.dueDate.localeCompare(b.dueDate)
      : b.dueDate.localeCompare(a.dueDate);
  });
}

