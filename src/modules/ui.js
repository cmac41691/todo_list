import {
  getTodos,
  removeTodo,
  toggleTodo,
} from './todo.js';

const listEl = document.getElementById('todo-list');

/**
 * Loops through all todos in memory
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
      renderTodos();
    });

    // delete button
    const del = document.createElement('button');
    del.textContent = '✕';
    del.classList.add('delete-btn');
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
      renderTodos();
    });
    li.append(del);

    listEl.append(li);
  });
}
