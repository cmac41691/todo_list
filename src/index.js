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

// Grab your DOM elements
const form          = document.getElementById('todo-form');
const input         = document.getElementById('todo-input');
const due           = document.getElementById('todo-due');
const projectSelect = document.getElementById('project-select');
const filterSelect  = document.getElementById('filter-select');
const sortSelect    = document.getElementById('sort-select');

// **1) ensure at least one project**
if (getProjects().length === 0) {
  createProject('Default');
}

// single entry-point to re-render
function refreshView() {
  let list = getTodos();
  list = filterTodosByDueDates(list, filterSelect.value);
  list = sortTodosByDueDate(list, sortSelect.value);
  renderTodos(list);
}

// INITIAL HOOKUPS
renderProjects();
projectSelect.addEventListener('change', e => {
  selectProject(e.target.value);
  renderProjects();
  refreshView();
});
filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change',   refreshView);

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
