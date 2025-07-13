// src/modules/ui.js
import { removeTodo, toggleTodo } from './todo.js';
import { getProjects, getCurrentProject } from './project.js';

export function renderProjects() {
  const select = document.getElementById('project-select');
  select.innerHTML = '';
  getProjects().forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === getCurrentProject()?.id) opt.selected = true;
    select.append(opt);
  });
}

export function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(t => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    // checkbox
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = t.done;
    chk.addEventListener('change', () => {
      toggleTodo(t.id);
      // after toggle we need a full refresh
      // (import & call refreshView from index.js)
    });
    li.append(chk);

    // text + due date
    const span = document.createElement('span');
    span.textContent = `${t.text} (due ${t.dueDate})`;
    if (t.done) span.style.textDecoration = 'line-through';
    li.append(span);

    // delete button
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.classList.add('delete-btn');
    btn.addEventListener('click', () => {
      removeTodo(t.id);
      // after delete we need a full refresh
      // (import & call refreshView from index.js)
    });
    li.append(btn);

    list.append(li);
  });
}

