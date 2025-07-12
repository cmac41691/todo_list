// src/modules/storage.js

// —————————————— PROJECTS PERSISTENCE ——————————————
const PROJECTS_KEY = 'todo_projects';

/**
 * Load the projects array from localStorage (or return []).
 */
export function loadProjects() {
  const json = localStorage.getItem(PROJECTS_KEY);
  return json ? JSON.parse(json) : [];
}

/**
 * Save the projects array back to localStorage.
 */
export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

// —————————————— TODOS PERSISTENCE ——————————————
const TODOS_KEY = 'todo_items';

/**
 * Load the todos array from localStorage (or return []).
 */
export function loadTodos() {
  const json = localStorage.getItem(TODOS_KEY);
  return json ? JSON.parse(json) : [];
}

/**
 * Save the todos array back to localStorage.
 */
export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
