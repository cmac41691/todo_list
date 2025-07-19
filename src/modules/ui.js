// src/modules/ui.js

import { toggleTodo, removeTodo } from './todo.js';
import { getProjects, getCurrentProject } from './project.js';
import { refreshView } from '../index.js';

export function renderProjects() {
  const select = document.getElementById('project-select');
  select.innerHTML = '';
  getProjects().forEach(p => {
    const opt = document.createElement('option');
    opt.value           = p.id;
    opt.textContent     = p.name;
    if (getCurrentProject()?.id === p.id) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

export function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(t => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // 1) checkbox
    const cb = document.createElement('input');
    cb.type    = 'checkbox';
    cb.checked = t.done;
    cb.addEventListener('change', () => {
      toggleTodo(t.id);
      refreshView();
    });
    li.appendChild(cb);

    // 2) text + due date
    const span = document.createElement('span');
    span.textContent = `${t.text} (due ${t.dueDate})`;
    li.appendChild(span);

    // 3) delete button
    const del = document.createElement('button');
    del.textContent = '×';
    del.addEventListener('click', () => {
      removeTodo(t.id);
      refreshView();
    });
    li.appendChild(del);

    list.appendChild(li);
  });
}
