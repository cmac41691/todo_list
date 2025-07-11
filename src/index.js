// src/index.js
import './style.css';

import {
  createTodo,
  addTodo,
  filterTodosByDueDates,
  sortTodosByDueDate,
} from './modules/todo.js';

import {
  selectProject,
  createProject,       // only if you have a form to make new projects
  getProjects,
  getCurrentProject,
} from './modules/project.js';

import {
  renderProjects,
  renderTodos,
} from './modules/ui.js';

// Grab your DOM elements
const form          = document.getElementById('todo-form');
const input         = document.getElementById('todo-input');
const due           = document.getElementById('todo-due');
const projectSelect = document.getElementById('project-select');
const filterSelect  = document.getElementById('filter-select');
const sortSelect    = document.getElementById('sort-select');

function refreshView() {
  // 1) filter, 2) sort, 3) render
  const filtered = filterTodosByDueDates(filterSelect.value);
  const sorted   = sortTodosByDueDate(filtered, sortSelect.value);
  renderTodos(sorted);
}

// INITIAL HOOKUPS

// Populate project dropdown & highlight current
renderProjects();
projectSelect.addEventListener('change', e => {
  selectProject(e.target.value);
  renderProjects();
  refreshView();
});

// Re‐render on filter/sort changes
filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change', refreshView);

// Add new todo
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(createTodo(text, due.value));
  refreshView();
  form.reset();
});

// First render of the todo list
refreshView();
