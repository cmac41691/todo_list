import './style.css'; 
import { createTodo, addTodo } from './modules/todo.js';
import { renderTodos } from './modules/ui.js';
import { updateTodoText } from './modules/todo.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const todo = createTodo(text);
  addTodo(todo);
  renderTodos();

  form.reset();
});

// initial render (will be empty)
renderTodos();
