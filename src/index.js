import createTodo from "./modules/todo";
import createProject from "./modules/project";
import renderTodo from "./modules/ui";
import "./style.css";

// Put project here so that it can create
const project = createProject("Default");

// multiple todos created for what needs to be done 
const todo1 = createTodo("Buy groceries", "Milk, eggs, and bread", "2025-06-14", "High");
const todo2 = createTodo("Clean floor", "Make Lunch", "2025-06-14", "Medium");
const todo3 = createTodo("Pay bill", "Credit Card", "2025-06-14", "Low");


// Add the todos into project
project.addTodo(todo1);
project.addTodo(todo2);
project.addTodo(todo3);

// For loop all three todos then render them
project.getTodos().forEach(todo => {
renderTodo(todo);
});