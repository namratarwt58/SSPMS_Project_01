// =========================
// TASKS MODULE
// =========================

const taskForm = document.getElementById("task-form");

if (taskForm) {

    const taskList = document.getElementById("task-list");
    const taskCount = document.getElementById("task-status");
    const emptyTaskState = document.getElementById("empty-task-state");

    let editTask = null;


    // ADD / UPDATE TASK

    taskForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const title =
            document.getElementById("task-title").value.trim();

        const description =
            document.getElementById("task-description").value.trim();

        const subject =
            document.getElementById("task-subject").value;

        const deadline =
            document.getElementById("task-deadline").value;

        const priority =
            document.getElementById("task-priority").value;


        // UPDATE EXISTING TASK

        if (editTask) {

            editTask.querySelector("h3").textContent = title;

            editTask.querySelector("p").textContent = description;

            const details =
                editTask.querySelectorAll(".task-details span");

            details[0].textContent = subject;
            details[1].textContent = deadline;
            details[2].textContent = priority;

            editTask = null;

            document.querySelector(
                "#task-form .primary-button"
            ).textContent = "Add Task";

            taskForm.reset();

            return;
        }


        // CREATE NEW TASK

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

                <button type="button" class="complete-button">
                    Complete
                </button>

                <button type="button" class="edit-button">
                    Edit
                </button>

                <button type="button" class="delete-button">
                    Delete
                </button>

            </div>
        `;


        emptyTaskState.style.display = "none";

        taskList.appendChild(task);

        updateTaskCount();

        taskForm.reset();

    });


    // TASK EDIT / COMPLETE / DELETE

    taskList.addEventListener("click", function (event) {

        // EDIT

        if (event.target.classList.contains("edit-button")) {

            const task =
                event.target.closest(".task-card");

            const details =
                task.querySelectorAll(".task-details span");

            document.getElementById("task-title").value =
                task.querySelector("h3").textContent;

            document.getElementById("task-description").value =
                task.querySelector("p").textContent;

            document.getElementById("task-subject").value =
                details[0].textContent;

            document.getElementById("task-deadline").value =
                details[1].textContent;

            document.getElementById("task-priority").value =
                details[2].textContent;

            editTask = task;

            document.querySelector(
                "#task-form .primary-button"
            ).textContent = "Update Task";
        }


        // COMPLETE

        if (event.target.classList.contains("complete-button")) {

            const button = event.target;

            const task =
                button.closest(".task-card");

            task.classList.toggle("completed");

            if (task.classList.contains("completed")) {

                button.textContent = "Completed";

            } else {

                button.textContent = "Complete";

            }

        }


        // DELETE

        if (event.target.classList.contains("delete-button")) {

            const task =
                event.target.closest(".task-card");

            task.remove();

            updateTaskCount();

            if (
                document.querySelectorAll(".task-card").length === 0
            ) {

                emptyTaskState.style.display = "block";

            }

        }

    });


    // TASK COUNTER

    function updateTaskCount() {

        const tasks =
            document.querySelectorAll(".task-card");

        taskCount.textContent =
            tasks.length +
            (tasks.length === 1 ? " task" : " tasks");

    }

}


// =========================
// SUBJECTS MODULE
// =========================

const subjectForm = document.getElementById("subject-form");

if (subjectForm) {

    const subjectList =
        document.getElementById("subject-list");

    const subjectCount =
        document.getElementById("subject-count");

    const subjectStatus =
        document.getElementById("subject-status");

    const emptySubjectState =
        document.getElementById("empty-subject-state");

    let editSubject = null;


    // ADD / UPDATE SUBJECT

    subjectForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("subject-name").value.trim();

        const code =
            document.getElementById("subject-code").value.trim();

        const description =
            document.getElementById("subject-description").value.trim();


        // UPDATE EXISTING SUBJECT

        if (editSubject) {

            editSubject.querySelector("h3").textContent =
                name;

            editSubject.querySelector(
                ".subject-description"
            ).textContent = description;

            editSubject.querySelector(
                ".subject-code"
            ).textContent = code;

            editSubject = null;

            document.querySelector(
                "#subject-form .primary-button"
            ).textContent = "Add Subject";

            subjectForm.reset();

            return;
        }


        // CREATE NEW SUBJECT

        const subject =
            document.createElement("div");

        subject.className = "subject-item";

        subject.innerHTML = `
            <div class="subject-info">

                <h3>${name}</h3>

                <p class="subject-description">
                    ${description}
                </p>

                <span class="subject-code">
                    ${code}
                </span>

            </div>

            <div class="subject-actions">

                <button
                    type="button"
                    class="edit-button"
                >
                    Edit
                </button>

                <button
                    type="button"
                    class="delete-button"
                >
                    Delete
                </button>

            </div>
        `;


        emptySubjectState.style.display = "none";

        subjectList.appendChild(subject);

        updateSubjectCount();

        subjectForm.reset();

    });


    // EDIT / DELETE SUBJECT

    subjectList.addEventListener("click", function (event) {

        // EDIT

        if (event.target.classList.contains("edit-button")) {

            const subject =
                event.target.closest(".subject-item");

            document.getElementById("subject-name").value =
                subject.querySelector("h3").textContent;

            document.getElementById("subject-code").value =
                subject.querySelector(".subject-code").textContent;

            document.getElementById(
                "subject-description"
            ).value =
                subject.querySelector(
                    ".subject-description"
                ).textContent;

            editSubject = subject;

            document.querySelector(
                "#subject-form .primary-button"
            ).textContent = "Update Subject";
        }


        // DELETE

        if (event.target.classList.contains("delete-button")) {

            const subject =
                event.target.closest(".subject-item");

            subject.remove();

            updateSubjectCount();

            if (
                document.querySelectorAll(".subject-item").length === 0
            ) {

                emptySubjectState.style.display = "block";

            }

        }

    });


    // SUBJECT COUNTER

    function updateSubjectCount() {

        const subjects =
            document.querySelectorAll(".subject-item");

        const count = subjects.length;

        subjectCount.textContent = count;

        subjectStatus.textContent =
            count +
            (count === 1 ? " subject" : " subjects");

    }

}
