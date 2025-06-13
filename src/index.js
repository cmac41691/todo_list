import createTodo from "./modules/todo";
import createProject from "./modules/project";
import "./style.css";

const todo1 = createTodo("Test", "This is a test", "2025-06-13", "High");
const project = createProject("Default");

project.addTodo(todo1);
console.log(project.getTodos());