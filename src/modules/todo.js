// src/modules/todo.js
import {
  getCurrentProject,
  addTodoToProject,
  removeTodoFromProject,
} from './project.js';
import { loadTodos, saveTodos } from './storage.js';
import { renderTodos } from './ui.js';

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
  }
  renderTodos(getTodos());
}

export function removeTodo(id) {
  const proj = getCurrentProject();
  if (proj) {
    removeTodoFromProject(id);
  } else {
    const idx = todos.findIndex(t => t.id === id);
    if (idx > -1) {
      todos.splice(idx, 1);
      saveTodos(todos);
    }
  }
  renderTodos(getTodos());
}

export function toggleTodo(id) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const item = list.find(t => t.id === id);
  if (item) {
    item.done = !item.done;
    if (proj) saveProjects(getProjects());
    else saveTodos(todos);
  }
  renderTodos(getTodos());
}

export function updateTodoText(id, newText) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.text = newText;
    if (proj) saveProjects(getProjects());
    else saveTodos(todos);
    renderTodos(getTodos());
  }
}

export function updateTodoDueDate(id, newDate) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.dueDate = newDate;
    if (proj) saveProjects(getProjects());
    else saveTodos(todos);
    renderTodos(getTodos());
  }
}

export function filterTodosByDueDates(when, list = getTodos()) {
  const today = new Date().toISOString().slice(0, 10);
  switch (when) {
    case 'today':
      return list.filter(t => t.dueDate === today);
    case 'overdue':
      return list.filter(t => t.dueDate < today);
    case 'upcoming':
      return list.filter(t => t.dueDate > today);
    default:
      return list;
  }
}

export function sortTodosByDueDate(list, order = 'none') {
  if (order === 'asc') {
    return [...list].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
  if (order === 'desc') {
    return [...list].sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  }
  return list;
}
