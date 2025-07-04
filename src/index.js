import './style.css';
import { createTodo, addTodo }         from './modules/todo.js';
import { renderTodos }                 from './modules/ui.js';
import { filterTodosByDueDates,
         sortTodosByDueDate }        from './modules/todo.js';

const form         = document.getElementById('todo-form');
const input        = document.getElementById('todo-input');
const due          = document.getElementById('todo-due');
const filterSelect = document.getElementById('filter-select');
const sortSelect   = document.getElementById('sort-select');

function refreshView() {
  // first filter, then sort, then render
  const filtered = filterTodosByDueDates(filterSelect.value);
  const sorted   = sortTodosByDueDate(filtered, sortSelect.value);
  renderTodos(sorted);
}

filterSelect.addEventListener('change', refreshView);
sortSelect  .addEventListener('change', refreshView);

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const todo = createTodo(text, due.value);
  addTodo(todo);
  refreshView();

  form.reset();
});

// initial render
refreshView();
