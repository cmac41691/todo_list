// src/modules/todo.js

// only persistence helpers live in storage.js
import { loadTodos, saveTodos } from './storage.js';

// project-scoped helpers live in project.js
import {
  getCurrentProject,
  addTodoToProject,
  removeTodoFromProject,
} from './project.js';

import { renderTodos } from './ui.js';

// now your add/remove/toggle functions can decide whether
// to push into the “flat” array or into the current project:

const todos = loadTodos();

export function getTodos() {
  return todos;
}

export function createTodo(text, dueDate) {
  return { id: Date.now().toString(), text, done: false, dueDate };
}

export function addTodo(todo) {
  const proj = getCurrentProject();
  if (proj) {
    addTodoToProject(todo);
  } else {
    todos.push(todo);
    saveTodos(todos);
    renderTodos();
  }
}

export function removeTodo(id) {
  const proj = getCurrentProject();
  if (proj) {
    removeTodoFromProject(id);
  } else {
    const idx = todos.findIndex(t => t.id === id);
    if (idx > -1) todos.splice(idx, 1);
    saveTodos(todos);
    renderTodos();
  }
}

/** Toggle done/undone */
export function toggleTodo(id) {
  const proj = getCurrentProject()
  if (!proj) throw new Error('No project selected')
  const t = proj.todos.find(t => t.id === id)
  if (t) t.done = !t.done
}

/** Update text inline */
export function updateTodoText(id, newText) {
  const proj = getCurrentProject()
  if (!proj) throw new Error('No project selected')
  const t = proj.todos.find(t => t.id === id)
  if (t) t.text = newText
}

/** Update due-date inline */
export function updateTodoDueDate(id, newDate) {
  const proj = getCurrentProject()
  if (!proj) throw new Error('No project selected')
  const t = proj.todos.find(t => t.id === id)
  if (t) t.dueDate = newDate
}

/** Filter helper — same as before */
export function filterTodosByDueDates(when) {
  const all = getTodos()
  const today = new Date().toISOString().slice(0, 10)
  switch (when) {
    case 'today':   return all.filter(t => t.dueDate === today)
    case 'overdue': return all.filter(t => t.dueDate && t.dueDate < today)
    case 'upcoming':return all.filter(t => t.dueDate && t.dueDate > today)
    default:        return all
  }
}

/** Sort helper — same as before */
export function sortTodosByDueDate(list = getTodos(), order = 'none') {
  if (order === 'none') return list
  const arr = [...list]
  return arr.sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return order === 'asc'
      ? a.dueDate.localeCompare(b.dueDate)
      : b.dueDate.localeCompare(a.dueDate)
  })
}
