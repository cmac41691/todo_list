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
const renameBtn     = document.getElementById('rename-project');
const deleteBtn     = document.getElementById('delete-project');

// **1) ensure at least one project**
if (getProjects().length === 0) {
  createProject('Default');
}

// single entry-point to re-render
function refreshView() {
  renderProjects(); // redraw project dropdown & highlight
  let list = getTodos();
  list = filterTodosByDueDates(list, filterSelect.value);
  list = sortTodosByDueDate(list, sortSelect.value);
  renderTodos(list);
}

// INITIAL HOOKUPS

// when you pick a different project
projectSelect.addEventListener('change', e => {
  selectProject(e.target.value);
  refreshView();
});

// rename current project
renameBtn.addEventListener('click', () => {
  // look up the currently-selected project by id
  const current = getProjects().find(p => p.id === projectSelect.value);
  if (!current) return;                       // nothing selected → bail

  // prompt with its existing name (or empty string)
  const newName = prompt('New project name:', current.name || '');
  if (newName && newName.trim()) {
    renameProject(current.id, newName.trim());
    refreshView();
  }
});

// delete current project
deleteBtn.addEventListener('click', () => {
  const current = getProjects().find(p => p.id === projectSelect.value);
  if (!current) return;                       // nothing selected → bail

  if (
    confirm(`Delete project “${current.name}” and all its tasks?`)
  ) {
    removeProject(current.id);
    // ensure there's always at least one project
    if (getProjects().length === 0) createProject('Default');

    // switch to the (new) first project
    selectProject(getProjects()[0].id);
    refreshView();
  }
});

// filter & sort
filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change',   refreshView);

// add new todo
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

// export if you need it elsewhere
export { refreshView };
