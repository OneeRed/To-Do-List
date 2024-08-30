let myInput = document.querySelector(".input");
let mySubmit = document.querySelector(".add");
let myTasks = document.querySelector(".tasks");
let myArray = [];

console.log(localStorage.getItem("task"))

let myNodeArray = [];

// Add Task
mySubmit.onclick = function () {
        if (myInput.value !== "") {
            myTaskDiv = document.createElement("div");
            myTaskDiv.className = "task";
            myTask = document.createElement("div");
            myDelete = document.createElement("button");
            myDelete.className = "delete"
            myDelete.prepend("Delete")
            myTask.prepend(myInput.value);
            myTaskDiv.appendChild(myTask);
            myTaskDiv.appendChild(myDelete);
            myTasks.appendChild(myTaskDiv);
    
            myNodeArray.push(`Id: ${Math.floor(Math.random() * 1_000_000_000_000)}, Title: ${myInput.value}`);
            localStorage.removeItem("tasks");
            localStorage.setItem("tasks", myNodeArray);
    
            
            // --------
            
            let myDeletes = document.querySelectorAll(".delete");
            
            myDeletes.forEach((deleteElement) =>{
                deleteElement.addEventListener('click', function(e) {
                    e.target.parentElement.remove();
                });
            });

            myInput.value = ""; // Empty Input Field
        }
}    
let myDeletes = document.querySelectorAll(".delete");

myDeletes.forEach((deleteElement) =>{
    deleteElement.addEventListener('click', function(e) {
        e.target.parentElement.remove();
    });
});




localStorage.clear()

console.log(Date.now())