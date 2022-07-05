let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elAll = document.querySelector(".js-all");
let elCompleted = document.querySelector(".js-completed");
let elUnCompleted = document.querySelector(".js-uncompleted");

let todos = [];



let renderTodo = (array, node) => {
    let result1 = 0; 
    let result2 = 0;
    
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
        let newCheckbox = document.createElement("input");
        
        newSpan.textContent = element.name;
        newButton.textContent = "Delete"
        newButton.setAttribute("class", "delete-btn");
        newButton.dataset.todoId = element.id;
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("class", "todo-check");
        newCheckbox.dataset.todoId = element.id;
        
        if (element.isComplete) {
            newSpan.style.textDecoration = "line-through"
            newCheckbox.checked = true;
            result1+= 1;
        }else{
            result2+= 1;
        }
        
        newItem.appendChild(newCheckbox);
        newItem.appendChild(newSpan);
        newItem.appendChild(newButton);
        node.appendChild(newItem);
    });
    
    elCompleted.textContent = result1;
    elUnCompleted.textContent = result2;
    
};



elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete-btn")) {
        let deletedId = evt.target.dataset.todoId;
        elList.innerHTML = "";
        let findedIndex = todos.findIndex((todo) => todo.id == deletedId);
        
    todos.splice(findedIndex, 1);
        elUnCompleted.textContent = todos.length;
        elAll.textContent = todos.length;
        renderTodo(todos, elList);
    } else if (evt.target.matches(".todo-check")) {
        let checkedId = evt.target.dataset.todoId;
        elList.innerHTML = "";
        let findedElement = todos.find((todo) => todo.id == checkedId)
        
        findedElement.isComplete = !findedElement.isComplete;
        renderTodo(todos, elList);
    }
});
console.log(elUnCompleted.textContent);
console.log(elAll.textContent);


elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    elList.innerHTML = "";
    let elInputVal = elInput.value;
    elAll.textContent = todos.length + 1;
    elUnCompleted.textContent = todos.length + 1;
    
    let obj = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 0,
        name: elInputVal,
        isComplete: false
    }
    todos.push(obj)
    renderTodo(todos, elList);
    elInput.value = "";
    console.log(obj);
});
