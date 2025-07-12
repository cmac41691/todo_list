// src/modules/ui.js
import { getProjects, getCurrentProject } from './project.js';

export function renderProjects() {
  const select = document.getElementById('project-select');
  select.innerHTML = '';
  getProjects().forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === getCurrentProject()?.id) opt.selected = true;
    select.appendChild(opt);
  });
}

export function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.text} (due ${t.dueDate})`;
    // you can wire up checkbox, edit, delete buttons here…
    list.appendChild(li);
  });
}


