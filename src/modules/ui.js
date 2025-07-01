// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,
} from './todo.js';

const listEl = document.getElementById('todo-list');

/**
 * Renders the provided list of todos (defaulting to all)
 */
export function renderTodos(list = getTodos()) {
  // clear out the old list
  listEl.innerHTML = '';

  // rebuild list from passed-in items
  list.forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.toggle('done', todo.done);

    // wrap text and due date
    const content = document.createElement('div');
    content.classList.add('todo-content');

    // main text
    const textEl = document.createElement('span');
    textEl.textContent = todo.text;
    content.append(textEl);

    // due-date, if provided
    if (todo.dueDate) {
      const dueEl = document.createElement('span');
      dueEl.classList.add('due');
      dueEl.textContent = `(Due: ${todo.dueDate})`;
      content.append(dueEl);
    }

    // toggle done state on click
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
    del.classList.add('delete-btn');
    del.textContent = '✕';
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
      renderTodos();
    });

    // assemble and append
    li.append(content, del);
    listEl.append(li);
  });
}
