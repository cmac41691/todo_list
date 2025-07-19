// src/modules/todo.js

import {
  getCurrentProject,
  addTodoToProject,
  removeTodoFromProject,
  getProjects,
} from './project.js';
import { loadTodos, saveTodos, saveProjects } from './storage.js';

// —————————————————————————————————————————————
//  Todos data + persistence (no UI here!)
// —————————————————————————————————————————————

const todos = loadTodos();

/** Return the list for the current project, or globals if none */
export function getTodos() {
  const proj = getCurrentProject();
  return proj ? proj.todos : todos;
}

/** Build a new todo object */
export function createTodo(text, dueDate) {
  return { id: Date.now().toString(), text, done: false, dueDate };
}

/** Add into project or global, then persist */
export function addTodo(todo) {
  const proj = getCurrentProject();
  if (proj) {
    addTodoToProject(todo);
    saveProjects(getProjects());
  } else {
    todos.push(todo);
    saveTodos(todos);
  }
}

/** Remove from project or global, then persist */
export function removeTodo(id) {
  const proj = getCurrentProject();
  if (proj) {
    removeTodoFromProject(id);
    saveProjects(getProjects());
  } else {
    const idx = todos.findIndex(t => t.id === id);
    if (idx > -1) {
      todos.splice(idx, 1);
      saveTodos(todos);
    }
  }
}

/** Toggle done flag, then persist */
export function toggleTodo(id) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const item = list.find(t => t.id === id);
  if (item) {
    item.done = !item.done;
    if (proj) saveProjects(getProjects());
    else       saveTodos(todos);
  }
}

/** Edit the text, then persist */
export function updateTodoText(id, newText) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.text = newText;
    if (proj) saveProjects(getProjects());
    else       saveTodos(todos);
  }
}

/** Edit the due date, then persist */
export function updateTodoDueDate(id, newDate) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.dueDate = newDate;
    if (proj) saveProjects(getProjects());
    else       saveTodos(todos);
  }
}


// ——————————————————————————————————————
//  Filtering / Sorting (unchanged)
// ——————————————————————————————————————

export function filterTodosByDueDates(list, when = 'all') {
  const today = new Date().toISOString().slice(0, 10);
  switch (when) {
    case 'today':    return list.filter(t => t.dueDate === today);
    case 'overdue':  return list.filter(t => t.dueDate < today);
    case 'upcoming': return list.filter(t => t.dueDate >= today);
    default:         return list;
  }
}

export function sortTodosByDueDate(list, order = 'none') {
  if (order === 'asc')  return [...list].sort((a,b) => a.dueDate.localeCompare(b.dueDate));
  if (order === 'desc') return [...list].sort((a,b) => b.dueDate.localeCompare(a.dueDate));
  return list;
}
