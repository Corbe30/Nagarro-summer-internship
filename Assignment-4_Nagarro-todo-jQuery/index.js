let allTodos = [];
// localStorage.clear();
let i = 0;

let button = $('button');
let error = $('span');
let todos = $('#todos')[0];
let todo = $('input')[0];

$(button).click(addTodo);

$(todo).keypress((event) => {
  if(event.which == 13) addTodo();
})

function addTodo() {
  let todoItem = todo.value;

  if (!todoItem) {
    $(error).html('Todo cannot be empty');
    return false;
  }

  $(error).html('');

  let todoData = {
    id: i++,
    todoItem,
    strike: false,
  };

  allTodos.push(todoData);
  listTodos();
  todo.value = '';
};

let deleteTodo = (id) => {
  allTodos = allTodos.filter(todo => todo.id != id);
  listTodos();
};

let checkTodo = (p, index) => {

  $(p).toggleClass('strikeThrough');
  allTodos[index].strike = !allTodos[index].strike;

  listTodos();
}

let editTodo = (index) => {
  let foo = prompt('Edit to-do:');

  if(foo != '')
    allTodos[index].todoItem = foo;
  listTodos();
}

let listTodos = () => {
  todos.textContent = '';

  for (let index = 0; index < allTodos.length; index++) {
    // let divTodo = document.createElement('div');
    let divTodo = $('<div></div>')[0];
    let p = $('<p></p>')[0];
    let del = $('<div></div>')[0];
    let check = $('<div></div>')[0];
    let edit = $('<div></div>')[0];

    $(p).html(allTodos[index].todoItem);
    // console.log(allTodos[index].strike)
    if(allTodos[index].strike){
      $(p).addClass('strikeThrough');
      $(divTodo).css('backgroundColor', '#90ee90');
    }
      

    $(edit).addClass('edit todoBtn');
    $(edit).on('click', () => editTodo(index));

    $(del).addClass('delete todoBtn');
    $(del).on('click', () => deleteTodo(allTodos[index].id));

    $(check).addClass('check todoBtn');
    $(check).on('click', () => checkTodo(p, index));

    $(divTodo).addClass('todo');
    $(divTodo).attr('id', allTodos[index].id);
    divTodo.append(p, edit, check, del);

    todos.appendChild(divTodo);
  }
  if(allTodos.length == 0)
    localStorage.clear();
  else
    localStorage.setItem('todos', JSON.stringify(allTodos));
};

function loadTodos(){

  if(JSON.parse(localStorage.getItem('todos')) === null) {
    allTodos = [];
  }
  else {
    allTodos = JSON.parse(localStorage.getItem('todos'));
    listTodos();
    for(var p = 0; p<allTodos.length; p++){
      i = Math.max(i, allTodos[p].id + 1)
    }
  }
}


function updateIndex(arr){
  console.log(arr)
  let tempTodos = [];
  for (let p = 0; p < arr.length; p++){
    for (let q = 0; q < allTodos.length; q++){
      if(allTodos[q].id == arr[p]){
        tempTodos.push(allTodos[q]);
        break;
      } 
    }
  }
  allTodos = tempTodos;
  listTodos();
}

$(document).ready(function() {

  $('.notStarted').sortable({
    group: 'shared',
    animation: 150,
    ghostClass: 'blue-background-class',
  })

  $('.doing').sortable({
    group: 'shared',
    animation: 150,
    ghostClass: 'blue-background-class',
  })

  $('#todos').sortable({
    animation: 150,
    ghostClass: 'blue-background-class',
    update:function(event, ui){
      var arr = $(this).sortable('toArray');
      updateIndex(arr);
    }
  });
})

loadTodos();