// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,
} from './todo.js';

const listEl = document.getElementById('todo-list');

export function renderTodos() {
  // clear out the old list
  listEl.innerHTML = '';

  // rebuild list from current state
  getTodos().forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.toggle('done', todo.done);

    // main text
    const textEl = document.createElement('span');
    textEl.textContent = todo.text;
    li.append(textEl);

    // due-date if present
    if (todo.dueDate) {
      const dueEl = document.createElement('span');
      dueEl.classList.add('due');
      dueEl.textContent = ` (Due: ${todo.dueDate})`;
      li.append(dueEl);
    }

    // toggle done on click
    li.addEventListener('click', () => {
      toggleTodo(todo.id);
      renderTodos();
    });

    // edit text on double-click
    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit this todo:', todo.text);
      if (newText != null) {
        updateTodoText(todo.id, newText);
        renderTodos();
      }
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
