let allTodos = [];

const button = document.querySelector('button');
const error = document.querySelector('span');
const todos = document.getElementById('todos');
const todo = document.querySelector('input');

button.addEventListener('click', addTodo);

var i = 0;

function addTodo() {
  const todoItem = todo.value;

  if (!todoItem) {
    error.innerHTML = 'Todo cannot be empty';
    return;
  }

  error.innerHTML = '';
  const todoData = {
    id: i++,
    todoItem,
  };

  allTodos.push(todoData);
  listTodos();
  todo.value = '';
};

const deleteTodo = (id) => {
  allTodos = allTodos.filter(todo => todo.id !== id);
  listTodos();
};

const listTodos = () => {
  todos.textContent = '';

  for (let index = 0; index < allTodos.length; index++) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const i = document.createElement('button');

    p.textContent = allTodos[index].todoItem;

    i.innerHTML = '✖';
    i.className = 'delete btn';
    i.addEventListener('click', () => deleteTodo(allTodos[index].id));

    div.className = 'todo';
    div.append(p, i);

    todos.appendChild(div);
  }
};
