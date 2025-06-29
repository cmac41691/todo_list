// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,
} from './todo.js';

const listEl = document.getElementById('todo-list');

export function renderTodos(list = getTodos()) {
  listEl.innerHTML = '';//  clear out the old list
  listEl.forEach( todo => {

  });

  // This rebuild list from current state of todos
  getTodos().forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.toggle('done', todo.done);

    // build the content wrapper in the Div
    const content = document.createElement('div');
    content.classList.add('todo-content');

    // main text
    const textEl = document.createElement('span');
    textEl.textContent = todo.text;
    content.append(textEl);

    // due date (if any)
    if (todo.dueDate) {
      const dueEl = document.createElement('span');
      dueEl.classList.add('due');
      dueEl.textContent = `(Due: ${todo.dueDate})`;
      content.append(dueEl);
    }

    // wire up toggle-done
    li.addEventListener('click', () => {
      toggleTodo(todo.id);
      renderTodos();
    });

    //  wire up edit
    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit this todo:', todo.text);
      if (newText != null) {
        updateTodoText(todo.id, newText);
        renderTodos();
      }
    });

    //  delete button
    const del = document.createElement('button');
    del.classList.add('delete-btn');
    del.textContent = '✕';
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
      renderTodos();
    });

    //  assemble it all together
    li.append(content, del);
    listEl.append(li);
  });
}
