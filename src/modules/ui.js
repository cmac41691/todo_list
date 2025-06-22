// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,
} from './todo.js';

const listEl = document.getElementById('todo-list');

/**
 *  Loops through all todos in memory
 * and re-renders the <ul> entirely.
 */
export function renderTodos() {
  // clear out old list
  listEl.innerHTML = '';

  getTodos().forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');

    // toggle done state on click
    li.addEventListener('click', () => {
      toggleTodo(todo.id);
    });

    // edit text on double-click
    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit this todo:', todo.text);
      if (newText != null) {
        updateTodoText(todo.id, newText);
      }
    });

    // delete button
    const del = document.createElement('button'); 
    del.textContent = '✕';
    del.classList.add('delete-btn');
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
    });

    li.append(del);
    listEl.append(li);
  });
}
