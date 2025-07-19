// src/index.js

import './style.css';

import {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodoText,
  updateTodoDueDate,
  getTodos,
  createTodo,
  filterTodosByDueDates,
  sortTodosByDueDate,
} from './modules/todo.js';

import {
  getProjects,
  createProject,
  selectProject,
  renameProject,
  removeProject,
} from './modules/project.js';

import { renderProjects, renderTodos } from './modules/ui.js';

// — Grab your DOM elements —
const form          = document.getElementById('todo-form');
const input         = document.getElementById('todo-input');
const due           = document.getElementById('todo-due');
const projectSelect = document.getElementById('project-select');
const renameBtn     = document.getElementById('rename-project');
const deleteBtn     = document.getElementById('delete-project');
const filterSelect  = document.getElementById('filter-select');
const sortSelect    = document.getElementById('sort-select');

// **1) ensure at least one project**
if (getProjects().length === 0) {
  createProject('Default');
}

// single entry-point to re-render everything
function refreshView() {
  renderProjects(); // redraw project <select>

  let list = getTodos();
  list = filterTodosByDueDates(list, filterSelect.value);
  list = sortTodosByDueDate(list, sortSelect.value);
  renderTodos(list);
}

// INITIAL HOOKUPS

// switching projects
projectSelect.addEventListener('change', e => {
  selectProject(e.target.value);
  refreshView();
});

// rename-project
renameBtn.addEventListener('click', () => {
  const current = getProjects().find(p => p.id === projectSelect.value);
  const newName = prompt('New project name:', current.name);
  if (newName && newName.trim()) {
    renameProject(current.id, newName.trim());
    refreshView();
  }
});

// delete-project
deleteBtn.addEventListener('click', () => {
  const id = projectSelect.value;
  if (confirm('Delete this project and all its tasks?')) {
    removeProject(id);

    // if none remain, re-create “Default”
    if (getProjects().length === 0) createProject('Default');

    // switch to first project
    selectProject(getProjects()[0].id);
    refreshView();
  }
});

// filtering & sorting
filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change',   refreshView);

// adding a new todo
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(createTodo(text, due.value));
  form.reset();
  refreshView();
});

// very first render
refreshView();

// export for tests or UI imports if needed
export { refreshView };
