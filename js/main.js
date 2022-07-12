let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elAll = document.querySelector(".js-all");
let elCompleted = document.querySelector(".js-completed");
let elUnCompleted = document.querySelector(".js-uncompleted");
let elBtnGroup = document.querySelector(".right");
let elUl = document.querySelector(".new-ul");

const localTodos = JSON.parse(window.localStorage.getItem("list"));
let todos = localTodos || [];
let bookmarkTodos = []



let renderTodo = (array, node) => {
    elAll.textContent = todos.length;
    elCompleted.textContent = todos.filter(e => e.isComplete).length;
    elUnCompleted.textContent = todos.filter(e => !e.isComplete).length;
    node.innerHTML = "";
    
    array.forEach(element => {
        let newItem = document.createElement("li");
        newItem.style.display = "flex";
        newItem.style.alignItems = "center";
        newItem.style.padding = "5px";
        newItem.style.backgroundColor = "antiquewhite";
        newItem.style.width = "300px"
        let newSpan = document.createElement("span");
        newSpan.style.marginRight = "15px";
        newSpan.style.marginLeft = "5px";
        let newButton = document.createElement("button");
        newButton.style.marginLeft = "auto";
        newButton.style.backgroundColor = "red";
        newButton.style.color = "white";
        newButton.style.border = "none";
        newButton.style.padding = "5px";
        let Bookmark = document.createElement("button");
        let newCheckbox = document.createElement("input");
        
        newSpan.textContent = element.name;
        newButton.textContent = "Delete"
        Bookmark.textContent = "Bookmark"
        newButton.setAttribute("class", "delete-btn");
        newButton.dataset.todoId = element.id;
        Bookmark.dataset.todoId = element.id;
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("class", "todo-check");
        newCheckbox.dataset.todoId = element.id;
        Bookmark.addEventListener("click", function(){
            
            let newItem2 = document.createElement("li");
            newItem2.textContent = element.name;
            elUl.appendChild(newItem2);
            
        })
        
        if (element.isComplete) {
            newSpan.style.textDecoration = "line-through"
            newCheckbox.checked = true;
            
        }
        
        newItem.appendChild(newCheckbox);
        newItem.appendChild(newSpan);
        newItem.appendChild(newButton);
        newItem.appendChild(Bookmark)
        node.appendChild(newItem);
    });
};

renderTodo(todos, elList);

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete-btn")) {
        let deletedId = evt.target.dataset.todoId;
        let findedIndex = todos.findIndex((todo) => todo.id == deletedId);
        
        todos.splice(findedIndex, 1);
        
        renderTodo(todos, elList);
        window.localStorage.setItem("list", JSON.stringify(todos));
    } else if (evt.target.matches(".todo-check")) {
        let checkedId = evt.target.dataset.todoId;
        let findedElement = todos.find((todo) => todo.id == checkedId)
        
        findedElement.isComplete = !findedElement.isComplete;
        renderTodo(todos, elList);
        window.localStorage.setItem("list", JSON.stringify(todos));
    }
});



elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    elList.innerHTML = "";
    let elInputVal = elInput.value;
    
    
    let obj = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 0,
        name: elInputVal,
        isComplete: false
    }
    todos.push(obj)
    renderTodo(todos, elList);
    window.localStorage.setItem("list", JSON.stringify(todos));
    elInput.value = "";
});

elBtnGroup.addEventListener("click", function(evt){
    if(evt.target.matches(".js-buttona")){
        renderTodo(todos, elList);
    }
    if(evt.target.matches(".js-buttonc")){
        const completedTodos = todos.filter(e => e.isComplete);
        renderTodo(completedTodos, elList);
    }
    if(evt.target.matches(".js-buttonu")){
        const unCompletedTodos = todos.filter(e => !e.isComplete);
        renderTodo(unCompletedTodos, elList);
    }
    if (evt.target.matches(".clear-button")) {
        window.localStorage.removeItem("list");
        window.location.reload();
        renderTodo(todos, elList);
    }
});



