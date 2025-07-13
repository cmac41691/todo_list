// src/modules/project.js
import { loadProjects, saveProjects } from './storage.js';
import { renderProjects, renderTodos } from './ui.js';

// 1️ Load existing projects (or create a default one if none exist)
let projects = loadProjects();
if (projects.length === 0) {
  projects = [
    { id: Date.now().toString(), name: 'Default', todos: [] }
  ];
  saveProjects(projects);
}

// 2️ Keep track of which project is currently selected
let currentProjectId = projects[0].id;

// 3️ Public API
export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return projects.find(p => p.id === currentProjectId) || null;
}

export function selectProject(id) {
  if (projects.some(p => p.id === id)) {
    currentProjectId = id;
    saveProjects(projects);
    renderProjects();
    renderTodos(getCurrentProject().todos);
  }
}

export function createProject(name) {
  const id = Date.now().toString();
  const newProj = { id, name, todos: [] };
  projects.push(newProj);
  currentProjectId = id;
  saveProjects(projects);
  renderProjects();
  renderTodos(newProj.todos);
}

export function renameProject(id, newName) {
  const p = projects.find(p => p.id === id);
  if (p) {
    p.name = newName;
    saveProjects(projects);
    renderProjects();
  }
}

export function removeProject(id) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx > -1) {
    projects.splice(idx, 1);
    currentProjectId = projects[0]?.id || null;
    saveProjects(projects);
    renderProjects();
    renderTodos(getCurrentProject()?.todos || []);
  }
}

// Helpers for project-scoped todos
export function addTodoToProject(todo) {
  const proj = getCurrentProject();
  if (proj) {
    proj.todos.push(todo);
    saveProjects(projects);
  }
}

export function removeTodoFromProject(todoId) {
  const proj = getCurrentProject();
  if (proj) {
    const i = proj.todos.findIndex(t => t.id === todoId);
    if (i > -1) {
      proj.todos.splice(i, 1);
      saveProjects(projects);
    }
  }
}
