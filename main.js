let myInput = document.querySelector(".input");
let mySubmit = document.querySelector(".add");
let myTasks = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage
getDataFromLocalStorage();

// Add Task
mySubmit.onclick = function () {
    if (myInput.value !== "") {
        addTaskToArray(myInput.value); // Add Task To Array Of Tasks
        myInput.value = ""; // Empty Input Field After Adding The Task
    }
}

// Click On Task Element
myTasks.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("delete")) {
        // Remove Element From Page
        e.target.parentElement.remove();
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }

    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Math.floor(Math.random() * 1_000_000_000_000),
        title: taskText,
        completed: false,
    };

    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addTaskToPageFrom(arrayOfTasks);

    // Add Tasks To Local Storage
    addDataToLocalStorage(arrayOfTasks);

    

};

function addTaskToPageFrom(arrayOfTasks) {
    // Empty Tasks Div To Avoid Tasks Repetition
    myTasks.innerHTML = "";

    for (let i = 0; i < arrayOfTasks.length; i++) {
        // Create Main Div
        myTaskDiv = document.createElement("div");
        myTaskDiv.className = "task";
        // If The Task Is Done
        if (arrayOfTasks[i].completed) {
            myTaskDiv.className = "task done";
        }
        myTaskDiv.setAttribute("data-id",arrayOfTasks[i].id)
        // Create Child Div
        myTask = document.createElement("div");
        myTask.prepend(arrayOfTasks[i].title);
        // Create Delete Button
        myDelete = document.createElement("button");
        myDelete.className = "delete";
        myDelete.prepend("Delete");

        // Append Task To Page
        myTaskDiv.appendChild(myTask);
        myTaskDiv.appendChild(myDelete);
        myTasks.appendChild(myTaskDiv);
        
    }
}

function addDataToLocalStorage(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {

    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }

    arrayOfTasks = arrayOfTasks.filter((el) => el.id != taskId);
    addDataToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorage(arrayOfTasks);
}

let deleteAll = document.querySelector(".delete-all");

deleteAll.onclick = function () {
    myTasks.innerHTML = "";
    localStorage.removeItem("tasks");
    arrayOfTasks = [];
}