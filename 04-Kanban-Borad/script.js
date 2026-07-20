// =========================
// Get references to the three Kanban columns
// =========================
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

// Stores the currently dragged task
let dragElement = null;

// Array of all columns for easier looping
const columns = [todo, progress, done];

// Object used to save tasks into localStorage
let tasksData = {};


// =========================
// Function to Create a New Task
// =========================
function addTask(title, desc, column) {

    // Create a new task div
    const div = document.createElement("div");

    // Add class and make it draggable
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    // Insert task content
    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `;

    // Add task to the given column
    column.appendChild(div);

    // Save the currently dragged task
    div.addEventListener("drag", () => {
        dragElement = div;
    });

    // Delete task when delete button is clicked
    const deleteButton = div.querySelector("button");

    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    return div;
}


// =========================
// Updates Task Count & Saves to LocalStorage
// =========================
function updateTaskCount() {

    columns.forEach(col => {

        // Get all tasks inside current column
        const tasks = col.querySelectorAll(".task");

        // Get the count element
        const count = col.querySelector(".right");

        // Store task data for localStorage
        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                Title: t.querySelector("h2").innerText,
                Desc: t.querySelector("p").innerText
            };
        });

        // Update count shown in UI
        count.innerText = tasks.length;
    });

    // Save everything to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasksData));
}


// =========================
// Load Tasks from LocalStorage
// =========================
if (localStorage.getItem("tasks")) {

    // Convert JSON string back into object
    const data = JSON.parse(localStorage.getItem("tasks"));

    // Loop through every column
    for (const col in data) {

        const column = document.querySelector(`#${col}`);

        // Recreate every task
        data[col].forEach(task => {
            addTask(task.Title, task.Desc, column);
        });

    }

    // Update task counts after loading
    updateTaskCount();
}


// =========================
// Add Drag Event to Existing Tasks
// =========================
const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {

    task.addEventListener("drag", () => {
        dragElement = task;
    });

});


// =========================
// Drag & Drop Functionality for Columns
// =========================
function addDragEventsOnColumn(column) {

    // Highlight column when task enters
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    // Remove highlight when leaving
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    // Allow dropping
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    // Handle dropping task
    column.addEventListener("drop", (e) => {

        e.preventDefault();

        // Move dragged task into this column
        column.appendChild(dragElement);

        // Remove highlight
        column.classList.remove("hover-over");

        // Update counts and localStorage
        updateTaskCount();

    });

}


// Enable drag events for all three columns
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


// =========================
// Modal Elements
// =========================
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");


// Open/Close Modal
toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});


// Close modal when clicking background
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});


// =========================
// Add New Task
// =========================
addTaskButton.addEventListener("click", () => {

    // Read user input
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    // Create task in Todo column
    addTask(taskTitle, taskDesc, todo);

    // Update task count and localStorage
    updateTaskCount();

    // Close modal
    modal.classList.remove("active");

    // Clear input fields
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

});