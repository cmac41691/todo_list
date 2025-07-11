// src/modules/ui.js
import {
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodoText,      // remove if not using inline editing
  updateTodoDueDate,
} from './todo.js';

import {
  getProjects,
  getCurrentProject,
} from './project.js';

const listEl    = document.getElementById('todo-list');
const projectEl = document.getElementById('project-select');

/**
 * Populate the “Project” select with all projects,
 * and mark the current one as selected.
 */
export function renderProjects() {
  projectEl.innerHTML = '';

  getProjects().forEach(proj => {
    const opt = document.createElement('option');
    opt.value       = proj.id;
    opt.textContent = proj.name;
    if (proj.id === getCurrentProject()?.id) {
      opt.selected = true;
    }
    projectEl.appendChild(opt);
  });
}

/**
 * Render the entire list of todos (for the current project),
 * with delete, toggle, date-edit, and optional inline edit.
 */
export function renderTodos(list = getTodos()) {
  listEl.innerHTML = '';

  list.forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.toggle('done', todo.done);

    // Toggle done when clicking the list item
    li.addEventListener('click', () => {
      toggleTodo(todo.id);
      renderTodos();
    });

    const content = document.createElement('div');
    content.classList.add('todo-content');

    // Text (double-click to edit)
    const textEl = document.createElement('span');
    textEl.textContent = todo.text;
    textEl.addEventListener('dblclick', e => {
      e.stopPropagation();
      const newText = prompt('Edit task text:', todo.text);
      if (newText !== null) {
        updateTodoText(todo.id, newText.trim());
        renderTodos();
      }
    });
    content.append(textEl);

    // Due-date (click to edit)
    if (todo.dueDate) {
      const dueEl = document.createElement('span');
      dueEl.classList.add('due');
      dueEl.textContent = `(Due: ${todo.dueDate})`;
      dueEl.addEventListener('click', e => {
        e.stopPropagation();
        const newDate = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate);
        if (newDate !== null) {
          if (newDate && isNaN(Date.parse(newDate))) {
            alert('Invalid date format!');
          } else {
            updateTodoDueDate(todo.id, newDate.trim());
          }
          renderTodos();
        }
      });
      content.append(dueEl);
    }

    // Delete button
    const del = document.createElement('button');
    del.classList.add('delete-btn');
    del.textContent = '✕';
    del.addEventListener('click', e => {
      e.stopPropagation();
      removeTodo(todo.id);
      renderTodos();
    });

    li.append(content, del);
    listEl.append(li);
  });
}