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

function refreshView() {
  const filtered = filterTodosByDueDates(filterSelect.value);
  const sorted   = sortTodosByDueDate(filtered, sortSelect.value);
  renderTodos(sorted);
}

// INITIAL HOOKUPS
renderProjects();
projectSelect.addEventListener('change', e => {
  selectProject(e.target.value);
  renderProjects();
  refreshView();
});

filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change', refreshView);

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(createTodo(text, due.value));
  refreshView();
  form.reset();
});

// first render
refreshView();
