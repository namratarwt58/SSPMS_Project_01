const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-status");
const emptyTaskState = document.getElementById("empty-task-state");
let editTask = null;
taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const subject = document.getElementById("task-subject").value;
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    const task = document.createElement("div");

    task.className = "task-card";

    task.innerHTML = `
        <div class="task-content">

            <h3>${title}</h3>

            <p>${description}</p>

            <div class="task-details">
                <span>${subject}</span>
                <span>${deadline}</span>
                <span>${priority}</span>
            </div>

<div class="task-actions">

    <button class="complete-button">
        Complete
    </button>

    <button class="edit-button">
        Edit
    </button>

    <button class="delete-button">
        Delete
    </button>

</div>

</div>
    `;

    emptyTaskState.style.display = "none";

    taskList.appendChild(task);

    updateTaskCount();

    taskForm.reset();
});


function updateTaskCount() {

    const tasks = document.querySelectorAll(".task-card");

    taskCount.textContent =
        tasks.length + (tasks.length === 1 ? " task" : " tasks");
}


/* Complete task */

taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("complete-button")) {

        const button = event.target;
        const task = button.closest(".task-card");

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {
            button.textContent = "Completed";
        } else {
            button.textContent = "Complete";
        }
    }
if (event.target.classList.contains("edit-button")) {

    const task = event.target.closest(".task-card");

    const title = task.querySelector("h3").textContent;
    const description = task.querySelector("p").textContent;

    const details = task.querySelectorAll(".task-details span");

    const subject = details[0].textContent;
    const deadline = details[1].textContent;
    const priority = details[2].textContent;

    document.getElementById("task-title").value = title;
    document.getElementById("task-description").value = description;
    document.getElementById("task-subject").value = subject;
    document.getElementById("task-deadline").value = deadline;
    document.getElementById("task-priority").value = priority;
if (editTask) {

    editTask.querySelector("h3").textContent = title;
    editTask.querySelector("p").textContent = description;

    const details = editTask.querySelectorAll(".task-details span");

    details[0].textContent = subject;
    details[1].textContent = deadline;
    details[2].textContent = priority;

    editTask = null;

    document.querySelector("#task-form .primary-button").textContent =
        "Add Task";

    taskForm.reset();

    return;
}
    editTask = task;

    document.querySelector("#task-form .primary-button").textContent =
        "Update Task";
}

    if (event.target.classList.contains("delete-button")) {

        const task = event.target.closest(".task-card");

        task.remove();

        updateTaskCount();

        if (document.querySelectorAll(".task-card").length === 0) {
            emptyTaskState.style.display = "block";
        }
    }

});
