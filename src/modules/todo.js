// src/modules/todo.js
import {
  getCurrentProject,
  addTodoToProject,
  removeTodoFromProject,
  getProjects,
} from './project.js';
import { loadTodos, saveTodos, saveProjects } from './storage.js';

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
    saveProjects(getProjects());
  } else {
    todos.push(todo);
    saveTodos(todos);
  }
  // ← no render here
}

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
  // ← no render here
}

export function toggleTodo(id) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const item = list.find(t => t.id === id);
  if (item) {
    item.done = !item.done;
    proj ? saveProjects(getProjects()) : saveTodos(todos);
  }
  // ← no render here
}

export function updateTodoText(id, newText) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.text = newText;
    proj ? saveProjects(getProjects()) : saveTodos(todos);
  }
  // ← no render here
}

export function updateTodoDueDate(id, newDate) {
  const proj = getCurrentProject();
  const list = proj ? proj.todos : todos;
  const t = list.find(t => t.id === id);
  if (t) {
    t.dueDate = newDate;
    proj ? saveProjects(getProjects()) : saveTodos(todos);
  }
  // ← no render here
}

/** FILTER BUILDER */
export function filterTodosByDueDates(list, when = 'all') {
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

/** SORT BUILDER */
export function sortTodosByDueDate(list, order = 'none') {
  if (order === 'asc') {
    return [...list].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
  if (order === 'desc') {
    return [...list].sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  }
  return list;
}
