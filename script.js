const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyTaskState = document.getElementById("empty-task-state");

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

        </div>

        <div class="task-actions">

    <button class="complete-button">
        Complete
    </button>

    <button class="delete-button">
        Delete
    </button>

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


    if (event.target.classList.contains("delete-button")) {

        const task = event.target.closest(".task-card");

        task.remove();

        updateTaskCount();

        if (document.querySelectorAll(".task-card").length === 0) {
            emptyTaskState.style.display = "block";
        }
    }

});
