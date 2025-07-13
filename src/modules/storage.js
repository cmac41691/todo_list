// src/modules/storage.js
export function loadTodos() {
  const json = localStorage.getItem('todos');
  return json ? JSON.parse(json) : [];
}
export function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// if you’re persisting projects too:
export function loadProjects() {
  const json = localStorage.getItem('projects');
  return json ? JSON.parse(json) : [];
}
export function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}
