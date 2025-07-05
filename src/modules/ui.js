// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,
  updateTodoDueDate,
} from './todo.js';

const listEl = document.getElementById('todo-list');

/**
 * 
 * This renders the entire lists of todo
 */
// src/modules/ui.js
export function renderTodos(list = getTodos()) {
  listEl.innerHTML = '';

  list.forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.toggle('done', todo.done);

    const content = document.createElement('div');
    content.classList.add('todo-content');

    // The text 
    const textEl = document.createElement('span');
    textEl.textContent = todo.text;
    content.append(textEl);

    // The due-date 
    if (todo.dueDate) {
      const dueEl = document.createElement('span');
      dueEl.classList.add('due');
      dueEl.textContent = `(Due: ${todo.dueDate})`;

      dueEl.addEventListener('click', e => {
        e.stopPropagation();                  // don’t toggle “done”
        const current = todo.dueDate || '';
        const newDate = prompt(
          'Edit due date (YYYY-MM-DD):',
          current
        );

        if (newDate !== null) {
          if (newDate && isNaN(Date.parse(newDate))) {
            alert('Invalid date format!');
          } else {
            updateTodoDueDate(todo.id, newDate.trim());
          }
          renderTodos();
        }
      });

      // only append once, after wiring up the listener
      content.append(dueEl);
    }

    // the delete button, toggle, etc.  
    const del = document.createElement('button');
    del.classList.add('delete-btn');
    del.textContent = '✕';
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
      renderTodos();
    });

    //This will assemble and append everything
    li.append(content, del);
    listEl.append(li);
  });
}
