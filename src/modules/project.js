// src/modules/project.js
import { loadProjects, saveProjects } from './storage.js';
import { renderProjects, renderTodos } from './ui.js';

// keep an in-memory copy of the projects list
const projects = loadProjects();

// default to the first project (if any)
let currentProjectId = projects.length ? projects[0].id : null;

/** Get the full list of projects */
export function getProjects() {
  return projects;
}

/** Get the currently selected project object (or null) */
export function getCurrentProject() {
  return projects.find(p => p.id === currentProjectId) || null;
}

/** Create a new project and make it current */
export function createProject(name) {
  const id = Date.now().toString();
  const newProj = { id, name, todos: [] };
  projects.push(newProj);
  currentProjectId = id;
  saveProjects(projects);
  renderProjects();
  renderTodos(newProj.todos);
}

/** Change the “current” project by its ID */
export function selectProject(id) {
  if (!projects.some(p => p.id === id)) return;
  currentProjectId = id;
  saveProjects(projects);
  renderProjects();
  renderTodos(getCurrentProject().todos);
}

/** Rename an existing project */
export function renameProject(id, newName) {
  const p = projects.find(p => p.id === id);
  if (!p) return;
  p.name = newName;
  saveProjects(projects);
  renderProjects();
}

/** Delete a project */
export function removeProject(id) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return;
  projects.splice(idx, 1);
  if (currentProjectId === id) {
    currentProjectId = projects.length ? projects[0].id : null;
  }
  saveProjects(projects);
  renderProjects();
  renderTodos(getCurrentProject()?.todos || []);
}

/** Add a todo to the current project */
export function addTodoToProject(todo) {
  const proj = getCurrentProject();
  if (!proj) return;
  proj.todos.push(todo);
  saveProjects(projects);
  renderTodos(proj.todos);
}

/** Remove a todo from the current project */
export function removeTodoFromProject(todoId) {
  const proj = getCurrentProject();
  if (!proj) return;
  const idx = proj.todos.findIndex(t => t.id === todoId);
  if (idx > -1) proj.todos.splice(idx, 1);
  saveProjects(projects);
  renderTodos(proj.todos);
}

// on initial load, ensure at least one project exists
if (!projects.length) {
  createProject('Default');
} else {
  // restore the last‐selected project view
  renderProjects();
  if (currentProjectId) renderTodos(getCurrentProject().todos);
}
