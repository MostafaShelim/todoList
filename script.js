// selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');
//listener
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);
//function

function addToDo(event){
    event.preventDefault();

    //create todo div

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create todo li
    const newTodoItem = document.createElement('li');
    newTodoItem.classList.add('todo-item');
    saveTodoLocal(todoInput.value);
    if(todoInput.value){
        newTodoItem.innerText = todoInput.value;
        todoDiv.appendChild(newTodoItem);

        //create check btn
        const checkButton = document.createElement('button');
        checkButton.classList.add('complete-btn');
        checkButton.innerHTML = "<i class = 'fa fa-check'></i>";
        todoDiv.appendChild(checkButton);

        //create delete btn
        const trash = document.createElement('button');
        trash.classList.add('trash-btn');
        trash.innerHTML = "<i class = 'fa fa-trash'></i>";
        todoDiv.appendChild(trash);

        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
    
}

//delete or check

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        //animation
        todo.classList.add('fall');
        deleteLocalTodo(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }else if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;

        //style
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveTodoLocal(todo){
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create todo li
        const newTodoItem = document.createElement('li');
        newTodoItem.classList.add('todo-item');
        if(todo){
            newTodoItem.innerText = todo;
            todoDiv.appendChild(newTodoItem);

            //create check btn
            const checkButton = document.createElement('button');
            checkButton.classList.add('complete-btn');
            checkButton.innerHTML = "<i class = 'fa fa-check'></i>";
            todoDiv.appendChild(checkButton);

            //create delete btn
            const trash = document.createElement('button');
            trash.classList.add('trash-btn');
            trash.innerHTML = "<i class = 'fa fa-trash'></i>";
            todoDiv.appendChild(trash);

            todoList.appendChild(todoDiv);
        }
    })
    
}
function deleteLocalTodo(todo){
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    let delTodo = todo.children[0].innerText;

    let idxOfTodo = todos.indexOf(delTodo);
    todos.splice(idxOfTodo, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
