// src/modules/project.js
import { loadProjects, saveProjects } from './storage.js';
import { getTodos, saveTodos } from './todo.js';
import { renderProjects, renderTodos } from './ui.js';

// load or initialize the projects array
const projects = loadProjects();

// track the currently selected project ID (persisted in storage)
let currentProjectId = projects.length ? projects[0].id : null;

/** Get all projects */
export function getProjects() {
  return projects;
}

/** Get the currently selected project object */
export function getCurrentProject() {
  return projects.find(p => p.id === currentProjectId) || null;
}

/** Change the current project */
export function selectProject(id) {
  if (projects.some(p => p.id === id)) {
    currentProjectId = id;
    saveProjects(projects, currentProjectId);
    renderProjects();
    // after switching project, re-render its todos
    renderTodos(getCurrentProject().todos);
  }
}

/** Create a new project */
export function createProject(name) {
  const id = Date.now().toString();
  const newProj = { id, name, todos: [] };
  projects.push(newProj);
  currentProjectId = id;
  saveProjects(projects, currentProjectId);
  renderProjects();
  renderTodos(newProj.todos);
}

/** Rename an existing project */
export function renameProject(id, newName) {
  const p = projects.find(p => p.id === id);
  if (p) {
    p.name = newName;
    saveProjects(projects, currentProjectId);
    renderProjects();
  }
}

/** Delete a project by its id */
export function removeProject(id) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx > -1) {
    projects.splice(idx, 1);
    // if we deleted the current project, select another or null
    if (currentProjectId === id) {
      currentProjectId = projects.length ? projects[0].id : null;
    }
    saveProjects(projects, currentProjectId);
    renderProjects();
    renderTodos(getCurrentProject()?.todos || []);
  }
}

/** Add a todo object to the current project */
export function addTodoToProject(todo) {
  const proj = getCurrentProject();
  if (!proj) return;
  proj.todos.push(todo);
  saveProjects(projects, currentProjectId);
  renderTodos(proj.todos);
}

/** Remove a todo from current project by id */
export function removeTodoFromProject(todoId) {
  const proj = getCurrentProject();
  if (!proj) return;
  const idx = proj.todos.findIndex(t => t.id === todoId);
  if (idx > -1) proj.todos.splice(idx, 1);
  saveProjects(projects, currentProjectId);
  renderTodos(proj.todos);
}

// on load, ensure there's at least one project
if (!projects.length) {
  createProject('Default');
} else {
  // restore projects view and todos of the last-selected
  renderProjects();
  if (currentProjectId) renderTodos(getCurrentProject().todos);
}
