let text = document.getElementById('text');
let add = document.querySelector('.add');
let ul = document.querySelector('ul');
let i = 1;
let filterOption = document.querySelector('.filter');
let list = document.querySelector('.list');
let small = document.querySelector('small');

document.addEventListener('DOMContentLoaded', getTodos);

const createTodo = function(){
    //create a li
    let li = document.createElement('li');
    ul.appendChild(li);

    //create a todo
    let todo = document.createElement('div');
    todo.classList.add('todo');
    li.appendChild(todo);

   
    //create a number on a left of our todo element
    let num = document.createElement('h1');
    num.textContent = ul.childElementCount;
    todo.appendChild(num);

    //create one more div which will contain value and date
    let box = document.createElement('div');
    box.classList.add('box');
    todo.appendChild(box);

    //create a paragraph which will contain a value
    let p = document.createElement('p');
    box.appendChild(p);
    p.classList.add('content');
    p.textContent = text.value.slice(0, 30);
    
    //create a div with buttons
    let btns = document.createElement('div');
    btns.classList.add('btns');
    todo.appendChild(btns);

    //create a checkbox
    let done = document.createElement('input');
    done.type = 'checkbox'
    done.classList.add('done');
    btns.appendChild(done);

    //create a delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = "X"
    btns.appendChild(deleteBtn);

    //Add todo to a local storage
    saveLocalTodos(text.value);
};


add.addEventListener('click', function(){
    
    if(text.value == ''){
        small.style.display = 'block';
        text.style.border = 'solid 1px red';
    } else {
        small.style.display = 'none';
        text.style.border = 'none';
        createTodo();
        text.value = null;
    }
    
});

text.addEventListener('keydown', function(e){
    if(e.key == 'Enter'){
        if(text.value == ''){
            small.style.display = 'block';
            text.style.border = 'solid 1px red';
        } else {
            small.style.display = 'none';
            text.style.border = 'none';
            createTodo();
            text.value = null;
        }
    } else{
        null
    }
});


const deleteandCheck = function(e){
    const item = e.target;
   if (item.classList[0] === 'delete'){
       const todo = item.parentElement;
       const todo1 = todo.parentElement;
       const todo2 = todo1.parentElement
      todo1.classList.add('fall');
        setTimeout(function(){
        todo2.remove();
        }, 500);
        removeLocalTodos(todo);
       
   };


   if (item.classList[0] === 'done'){
    const todo = item.parentElement;
    const todo1 = todo.parentElement;
    //console.log(todo1.parentElement);
    todo1.parentElement.classList.toggle('completed');
};
};

ul.addEventListener('click', deleteandCheck);


function filterTodo(e){
    const todos = ul.childNodes;
    console.log(todos);
    for(let todo of todos){
        console.log(todo);
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
                break;
            case 'uncompleted':
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
                break;
        }
    }
};

filterOption.addEventListener('click', filterTodo);

function saveLocalTodos(todo){
    //Check if we have a todos

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todone){

    let li = document.createElement('li');
    ul.appendChild(li);

    //create a todo
    let todo = document.createElement('div');
    todo.classList.add('todo');
    li.appendChild(todo);

   
    //create a number on a left of our todo element
    let num = document.createElement('h1');
    num.textContent = ul.childElementCount;
    todo.appendChild(num);

    //create one more div which will contain value and date
    let box = document.createElement('div');
    box.classList.add('box');
    todo.appendChild(box);

    //create a paragraph which will contain a value
    let p = document.createElement('p');
    box.appendChild(p);
    p.classList.add('content');
    p.textContent = todone;

    //create a div with buttons
    let btns = document.createElement('div');
    btns.classList.add('btns');
    todo.appendChild(btns);

    //create a checkbox
    let done = document.createElement('input');
    done.type = 'checkbox'
    done.classList.add('done');
    btns.appendChild(done);

    //create a delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = "X"
    btns.appendChild(deleteBtn);
    });
};

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

