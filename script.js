


/* =====================================================
   SUBJECT MODULE
===================================================== */

const subjectForm = document.getElementById("subject-form");

if (subjectForm) {

    const subjectList =
        document.getElementById("subject-list");

    const subjectCount =
        document.getElementById("subject-count");

    const emptySubjectState =
        document.getElementById("empty-subject-state");

    const SUBJECT_KEY = "studyflow_subjects";

    let editingSubjectId = null;


    function getSubjects() {

        return JSON.parse(
            localStorage.getItem(SUBJECT_KEY)
        ) || [];

    }


    function saveSubjects(subjects) {

        localStorage.setItem(
            SUBJECT_KEY,
            JSON.stringify(subjects)
        );

    }


    function renderSubjects() {

        const subjects = getSubjects();

        subjectList.innerHTML = "";


        if (subjects.length === 0) {

            emptySubjectState.style.display = "block";

        } else {

            emptySubjectState.style.display = "none";


            subjects.forEach(function (subject) {

                const item =
                    document.createElement("div");

                item.className = "subject-item";


                item.innerHTML = `

                    <div class="subject-info">

                        <h3>${subject.name}</h3>

                        <p class="subject-description">
                            ${subject.description || "No description provided."}
                        </p>

                        <span class="subject-code">
                            ${subject.code}
                        </span>

                    </div>

                    <div class="subject-actions">

                        <button
                            type="button"
                            class="edit-button"
                            data-id="${subject.id}"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            class="delete-button"
                            data-id="${subject.id}"
                        >
                            Delete
                        </button>

                    </div>

                `;


                subjectList.appendChild(item);

            });

        }


        subjectCount.textContent = subjects.length;

    }


    /* ADD / UPDATE SUBJECT */

    subjectForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("subject-name")
                .value
                .trim();

        const code =
            document.getElementById("subject-code")
                .value
                .trim();

        const description =
            document.getElementById("subject-description")
                .value
                .trim();


        if (!name || !code) {

            alert("Please fill the subject name and code.");

            return;

        }


        const subjects = getSubjects();


        /* UPDATE */

        if (editingSubjectId !== null) {

            const subject =
                subjects.find(function (item) {

                    return item.id === editingSubjectId;

                });


            if (subject) {

                subject.name = name;
                subject.code = code;
                subject.description = description;

            }


            saveSubjects(subjects);

            editingSubjectId = null;


            document.querySelector(
                "#subject-form .primary-button"
            ).textContent = "Add Subject";


            subjectForm.reset();

            renderSubjects();

            return;

        }


        /* ADD */

        const newSubject = {

            id: Date.now(),

            name: name,

            code: code,

            description: description

        };


        subjects.push(newSubject);

        saveSubjects(subjects);

        subjectForm.reset();

        renderSubjects();

    });


    /* EDIT / DELETE */

    subjectList.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);


        const subjects =
            getSubjects();


        /* EDIT */

        if (button.classList.contains("edit-button")) {

            const subject =
                subjects.find(function (item) {

                    return item.id === id;

                });


            if (!subject) {
                return;
            }


            document.getElementById(
                "subject-name"
            ).value = subject.name;


            document.getElementById(
                "subject-code"
            ).value = subject.code;


            document.getElementById(
                "subject-description"
            ).value = subject.description;


            editingSubjectId = subject.id;


            document.querySelector(
                "#subject-form .primary-button"
            ).textContent = "Update Subject";

        }


        /* DELETE */

        if (button.classList.contains("delete-button")) {

            const updatedSubjects =
                subjects.filter(function (item) {

                    return item.id !== id;

                });


            saveSubjects(updatedSubjects);

            renderSubjects();

        }

    });


    renderSubjects();

}



/* =====================================================
   TASK MODULE
===================================================== */

const taskForm = document.getElementById("task-form");

if (taskForm) {

    const taskList =
        document.getElementById("task-list");

    const taskCount =
        document.getElementById("task-count");

    const taskStatus =
        document.getElementById("task-status");

    const emptyTaskState =
        document.getElementById("empty-task-state");

    const TASK_KEY = "studyflow_tasks";

    let editingTaskId = null;


    function getTasks() {

        return JSON.parse(
            localStorage.getItem(TASK_KEY)
        ) || [];

    }


    function saveTasks(tasks) {

        localStorage.setItem(
            TASK_KEY,
            JSON.stringify(tasks)
        );

    }


    function renderTasks() {

        const tasks = getTasks();

        taskList.innerHTML = "";


        if (tasks.length === 0) {

            emptyTaskState.style.display = "block";

        } else {

            emptyTaskState.style.display = "none";


            tasks.forEach(function (task) {

                const item =
                    document.createElement("div");

                item.className = "task-card";


                if (task.completed) {

                    item.classList.add("completed");

                }


                item.innerHTML = `

                    <div class="task-content">

                        <h3>${task.title}</h3>

                        <p>
                            ${task.description || "No description provided."}
                        </p>

                        <div class="task-details">

                            <span>${task.subject}</span>

                            <span>${task.deadline}</span>

                            <span>${task.priority}</span>

                        </div>

                    </div>


                    <div class="task-actions">

                        <button
                            type="button"
                            class="complete-button"
                            data-id="${task.id}"
                        >
                            ${task.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                            type="button"
                            class="edit-button"
                            data-id="${task.id}"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            class="delete-button"
                            data-id="${task.id}"
                        >
                            Delete
                        </button>

                    </div>

                `;


                taskList.appendChild(item);

            });

        }


        updateTaskCount(tasks);

    }


    function updateTaskCount(tasks) {

        const pending =
            tasks.filter(function (task) {

                return !task.completed;

            }).length;


        taskCount.textContent =
            tasks.length;


        taskStatus.textContent =
            tasks.length === 0
                ? "No tasks"
                : pending + " pending";

    }


    /* ADD / UPDATE TASK */

    taskForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document.getElementById("task-title")
                .value
                .trim();

        const description =
            document.getElementById("task-description")
                .value
                .trim();

        const subject =
            document.getElementById("task-subject")
                .value
                .trim();

        const deadline =
            document.getElementById("task-deadline")
                .value;

        const priority =
            document.getElementById("task-priority")
                .value;


        if (!title || !subject || !deadline || !priority) {

            alert("Please fill all required task fields.");

            return;

        }


        const tasks = getTasks();


        /* UPDATE */

        if (editingTaskId !== null) {

            const task =
                tasks.find(function (item) {

                    return item.id === editingTaskId;

                });


            if (task) {

                task.title = title;
                task.description = description;
                task.subject = subject;
                task.deadline = deadline;
                task.priority = priority;

            }


            saveTasks(tasks);

            editingTaskId = null;


            document.querySelector(
                "#task-form .primary-button"
            ).textContent = "Add Task";


            taskForm.reset();

            renderTasks();

            return;

        }


        /* ADD */

        const newTask = {

            id: Date.now(),

            title: title,

            description: description,

            subject: subject,

            deadline: deadline,

            priority: priority,

            completed: false

        };


        tasks.push(newTask);

        saveTasks(tasks);

        taskForm.reset();

        renderTasks();

    });


    /* COMPLETE / EDIT / DELETE */

    taskList.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);


        const tasks =
            getTasks();


        /* COMPLETE */

        if (
            button.classList.contains(
                "complete-button"
            )
        ) {

            const task =
                tasks.find(function (item) {

                    return item.id === id;

                });


            if (task) {

                task.completed =
                    !task.completed;

            }


            saveTasks(tasks);

            renderTasks();

        }


        /* EDIT */

        if (
            button.classList.contains(
                "edit-button"
            )
        ) {

            const task =
                tasks.find(function (item) {

                    return item.id === id;

                });


            if (!task) {
                return;
            }


            document.getElementById(
                "task-title"
            ).value = task.title;


            document.getElementById(
                "task-description"
            ).value = task.description;


            document.getElementById(
                "task-subject"
            ).value = task.subject;


            document.getElementById(
                "task-deadline"
            ).value = task.deadline;


            document.getElementById(
                "task-priority"
            ).value = task.priority;


            editingTaskId = task.id;


            document.querySelector(
                "#task-form .primary-button"
            ).textContent = "Update Task";

        }


        /* DELETE */

        if (
            button.classList.contains(
                "delete-button"
            )
        ) {

            const updatedTasks =
                tasks.filter(function (item) {

                    return item.id !== id;

                });


            saveTasks(updatedTasks);

            renderTasks();

        }

    });


    renderTasks();

}



/* =====================================================
   PLANNER MODULE
===================================================== */
// =====================================================
// STUDYFLOW - STUDY PLANNER
// =====================================================

const plannerForm = document.getElementById("planner-form");

if (plannerForm) {

    // -------------------------------------------------
    // ELEMENTS
    // -------------------------------------------------

    const plannerList =
        document.getElementById("planner-list");

    const plannerCount =
        document.getElementById("planner-count");

    const plannerStatus =
        document.getElementById("planner-status");


    // -------------------------------------------------
    // LOCAL STORAGE
    // -------------------------------------------------

    const PLANNER_KEY = "studyflow_planner";


    // Used when editing an existing plan
    let editingPlannerId = null;


    // -------------------------------------------------
    // GET PLANS FROM LOCAL STORAGE
    // -------------------------------------------------

    function getPlans() {

        const storedPlans =
            localStorage.getItem(PLANNER_KEY);

        if (!storedPlans) {
            return [];
        }

        try {

            return JSON.parse(storedPlans);

        } catch (error) {

            console.error(
                "Could not read planner data:",
                error
            );

            return [];

        }

    }


    // -------------------------------------------------
    // SAVE PLANS TO LOCAL STORAGE
    // -------------------------------------------------

    function savePlans(plans) {

        localStorage.setItem(
            PLANNER_KEY,
            JSON.stringify(plans)
        );

    }


    // -------------------------------------------------
    // UPDATE PLANNER COUNT
    // -------------------------------------------------

    function updatePlannerCount(plans) {

        plannerCount.textContent = plans.length;


        if (plans.length === 0) {

            plannerStatus.textContent =
                "No sessions";

        } else if (plans.length === 1) {

            plannerStatus.textContent =
                "1 session";

        } else {

            plannerStatus.textContent =
                plans.length + " sessions";

        }

    }


    // -------------------------------------------------
    // RENDER EMPTY STATE
    // -------------------------------------------------

    function renderEmptyState() {

        plannerList.innerHTML = `

            <div
                class="planner-empty"
                id="empty-planner-state"
            >

                <div class="empty-mark">
                    —
                </div>

                <h3>
                    No study plans yet.
                </h3>

                <p>
                    Add your first study session and it will appear here.
                </p>

            </div>

        `;

    }


    // -------------------------------------------------
    // RENDER PLANNER
    // -------------------------------------------------

    function renderPlanner() {

        const plans = getPlans();


        // Clear current list
        plannerList.innerHTML = "";


        // No plans
        if (plans.length === 0) {

            renderEmptyState();

            updatePlannerCount(plans);

            return;

        }


        // Display every plan
        plans.forEach(function (plan) {

            const item =
                document.createElement("div");

            item.className = "planner-item";


            item.innerHTML = `

                <div class="planner-time">
                    ${plan.time}
                </div>


                <div class="planner-session">

                    <h3>
                        ${plan.topic}
                    </h3>

                    <p>
                        Study session
                    </p>


                    <div class="planner-details">

                        <span>
                            ${plan.subject}
                        </span>

                        <span>
                            ${plan.date}
                        </span>

                        <span>
                            ${plan.duration}
                        </span>

                    </div>

                </div>


                <div class="planner-actions">

                    <button
                        type="button"
                        class="edit-button"
                        data-id="${plan.id}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="delete-button"
                        data-id="${plan.id}"
                    >
                        Delete
                    </button>

                </div>

            `;


            plannerList.appendChild(item);

        });


        updatePlannerCount(plans);

    }


    // -------------------------------------------------
    // ADD / UPDATE PLAN
    // -------------------------------------------------

    plannerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // -----------------------------------------
            // GET FORM VALUES
            // -----------------------------------------

            const subject =
                document
                    .getElementById("planner-subject")
                    .value
                    .trim();


            const topic =
                document
                    .getElementById("planner-topic")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("planner-date")
                    .value;


            const time =
                document
                    .getElementById("planner-time")
                    .value;


            const duration =
                document
                    .getElementById("planner-duration")
                    .value;


            // -----------------------------------------
            // VALIDATION
            // -----------------------------------------

            if (
                subject === "" ||
                topic === "" ||
                date === "" ||
                time === "" ||
                duration === ""
            ) {

                alert(
                    "Please fill all planner fields."
                );

                return;

            }


            // -----------------------------------------
            // GET EXISTING PLANS
            // -----------------------------------------

            const plans = getPlans();


            // -----------------------------------------
            // UPDATE EXISTING PLAN
            // -----------------------------------------

            if (editingPlannerId !== null) {

                const plan =
                    plans.find(function (item) {

                        return item.id === editingPlannerId;

                    });


                if (plan) {

                    plan.subject = subject;

                    plan.topic = topic;

                    plan.date = date;

                    plan.time = time;

                    plan.duration = duration;

                }


                savePlans(plans);


                editingPlannerId = null;


                plannerForm.reset();


                document.querySelector(
                    "#planner-form .primary-button"
                ).textContent = "Add to Planner";


                renderPlanner();


                return;

            }


            // -----------------------------------------
            // CREATE NEW PLAN
            // -----------------------------------------

            const newPlan = {

                id: Date.now(),

                subject: subject,

                topic: topic,

                date: date,

                time: time,

                duration: duration

            };


            // Add to array
            plans.push(newPlan);


            // Save to localStorage
            savePlans(plans);


            // Clear form
            plannerForm.reset();


            // Show updated planner
            renderPlanner();

        }
    );


    // -------------------------------------------------
    // EDIT / DELETE
    // -------------------------------------------------

    plannerList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("button");


            if (!button) {
                return;
            }


            const id =
                Number(button.dataset.id);


            const plans =
                getPlans();


            // -----------------------------------------
            // EDIT
            // -----------------------------------------

            if (
                button.classList.contains(
                    "edit-button"
                )
            ) {

                const plan =
                    plans.find(function (item) {

                        return item.id === id;

                    });


                if (!plan) {
                    return;
                }


                document.getElementById(
                    "planner-subject"
                ).value = plan.subject;


                document.getElementById(
                    "planner-topic"
                ).value = plan.topic;


                document.getElementById(
                    "planner-date"
                ).value = plan.date;


                document.getElementById(
                    "planner-time"
                ).value = plan.time;


                document.getElementById(
                    "planner-duration"
                ).value = plan.duration;


                editingPlannerId =
                    plan.id;


                document.querySelector(
                    "#planner-form .primary-button"
                ).textContent = "Update Plan";


                return;

            }


            // -----------------------------------------
            // DELETE
            // -----------------------------------------

            if (
                button.classList.contains(
                    "delete-button"
                )
            ) {

                const updatedPlans =
                    plans.filter(function (item) {

                        return item.id !== id;

                    });


                savePlans(updatedPlans);


                renderPlanner();

            }

        }
    );


    // -------------------------------------------------
    // INITIAL LOAD
    // -------------------------------------------------

    renderPlanner();

}


// ===============================
// DASHBOARD MODULE
// ===============================

const pendingTasksCount = document.getElementById("pending-tasks-count");

if (pendingTasksCount) {

    const tasks =
        JSON.parse(localStorage.getItem("studyflow_tasks")) || [];

    const pendingTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    pendingTasksCount.textContent = pendingTasks.length;
}
// Completed Tasks

const completedTasksCount = document.getElementById("completed-tasks-count");

if (completedTasksCount) {

    const tasks =
        JSON.parse(localStorage.getItem("studyflow_tasks")) || [];

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    });

    completedTasksCount.textContent = completedTasks.length;
}
// Due Today

const dueTodayCount = document.getElementById("due-today-count");

if (dueTodayCount) {

    const tasks =
        JSON.parse(localStorage.getItem("studyflow_tasks")) || [];

    const today = new Date().toISOString().split("T")[0];

    const dueTodayTasks = tasks.filter(function(task) {
        return task.deadline === today && !task.completed;
    });

    dueTodayCount.textContent = dueTodayTasks.length;
}
// Today's Tasks

const todayTasksContainer =
    document.getElementById("today-tasks-container");

if (todayTasksContainer) {

    const tasks =
        JSON.parse(localStorage.getItem("studyflow_tasks")) || [];

    const today = new Date().toISOString().split("T")[0];

    const todayTasks = tasks.filter(function(task) {
        return task.deadline === today && !task.completed;
    });

    if (todayTasks.length > 0) {

        todayTasksContainer.className = "today-tasks-list";

        todayTasksContainer.innerHTML = "";

        todayTasks.forEach(function(task) {

            const taskItem = document.createElement("div");

            taskItem.className = "dashboard-task-item";

            taskItem.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.subject}</p>
                </div>

                <span>${task.priority}</span>
            `;

            todayTasksContainer.appendChild(taskItem);
        });
    }
}
