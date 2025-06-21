// src/modules/storage.js
const TODOS_KEY = 'my_todo_app.todos';

/** Saves the array of todos to localStorage */
export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

/** Loads the saved todos, or returns [] if nothing’s stored */
export function loadTodos() {
  const json = localStorage.getItem(TODOS_KEY);
  try {
    return json ? JSON.parse(json) : [];
  } catch {
    console.warn('Invalid todo data in storage, resetting');
    return [];
  }
}
