// src/modules/project.js
import { loadProjects, saveProjects } from './storage.js';
import { renderProjects, renderTodos } from './ui.js';

// —————————————————————————————————————————————
// Projects data + persistence (no UI here!)
// —————————————————————————————————————————————

// Load or initialize the projects array
let projects = loadProjects();
if (projects.length === 0) {
  projects = [{ id: Date.now().toString(), name: 'Default', todos: [] }];
  saveProjects(projects);
}

// Track the currently‐selected project in memory
let currentProjectId = projects[0].id;

/** Get all projects */
export function getProjects() {
  return projects;
}

/** Get the currently‐selected project */
export function getCurrentProject() {
  return projects.find(p => p.id === currentProjectId) || null;
}

/** Select a different project by its ID */
export function selectProject(id) {
  if (projects.some(p => p.id === id)) {
    currentProjectId = id;
    saveProjects(projects);
  }
}

/** Create a new project and select it */
export function createProject(name) {
  const id = Date.now().toString();
  const newProj = { id, name, todos: [] };
  projects.push(newProj);
  currentProjectId = id;
  saveProjects(projects);
}

/** Rename an existing project */
export function renameProject(id, newName) {
  const p = projects.find(p => p.id === id);
  if (p) {
    p.name = newName;
    saveProjects(projects);
  }
}

/** Delete a project (and switch selection) */
export function removeProject(id) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx > -1) {
    // 1) remove it
    projects.splice(idx, 1);

    // 2) if that was the last project, re-create the default
    if (projects.length === 0) {
      const defaultId = Date.now().toString();
      projects.push({ id: defaultId, name: 'Default', todos: [] });
    }

    // 3) pick the first project in the array as the new current
    currentProjectId = projects[0].id;

    // 4) persist & re-render
    saveProjects(projects);
    renderProjects();
    renderTodos(getCurrentProject().todos);
  }
}

/** Add a todo object into the current project */
export function addTodoToProject(todo) {
  const proj = getCurrentProject();
  if (proj) {
    proj.todos.push(todo);
    saveProjects(projects);
  }
}

/** Remove a todo (by its ID) from the current project */
export function removeTodoFromProject(todoId) {
  const proj = getCurrentProject();
  if (proj) {
    proj.todos = proj.todos.filter(t => t.id !== todoId);
    saveProjects(projects);
  }
}
