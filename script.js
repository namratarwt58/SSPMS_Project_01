


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

const plannerForm =
    document.getElementById("planner-form");

if (plannerForm) {

    const plannerList =
        document.getElementById("planner-list");

    const plannerCount =
        document.getElementById("planner-count");

    const plannerStatus =
        document.getElementById("planner-status");

    const emptyPlannerState =
        document.getElementById("empty-planner-state");

    const PLANNER_KEY = "studyflow_planner";

    let editingPlannerId = null;


    function getPlans() {

        return JSON.parse(
            localStorage.getItem(PLANNER_KEY)
        ) || [];

    }


    function savePlans(plans) {

        localStorage.setItem(
            PLANNER_KEY,
            JSON.stringify(plans)
        );

    }


    function renderPlanner() {

        const plans = getPlans();

        plannerList.innerHTML = "";


        if (plans.length === 0) {

            emptyPlannerState.style.display = "block";

        } else {

            emptyPlannerState.style.display = "none";


            plans.forEach(function (plan) {

                const item =
                    document.createElement("div");

                item.className = "planner-item";


                item.innerHTML = `

                    <div class="planner-time">
                        ${plan.time}
                    </div>

                    <div class="planner-session">

                        <h3>${plan.topic}</h3>

                        <p>Study session</p>

                        <div class="planner-details">

                            <span>${plan.subject}</span>

                            <span>${plan.date}</span>

                            <span>${plan.duration}</span>

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

        }


        updatePlannerCount(plans);

    }


    function updatePlannerCount(plans) {

        plannerCount.textContent =
            plans.length;


        plannerStatus.textContent =
            plans.length === 0
                ? "No sessions"
                : plans.length === 1
                    ? "1 session"
                    : plans.length + " sessions";

    }


    /* ADD / UPDATE PLAN */

    plannerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const subject =
            document.getElementById("planner-subject")
                .value;

        const topic =
            document.getElementById("planner-topic")
                .value
                .trim();

        const date =
            document.getElementById("planner-date")
                .value;

        const time =
            document.getElementById("planner-time")
                .value;

        const duration =
            document.getElementById("planner-duration")
                .value;


        if (
            !subject ||
            !topic ||
            !date ||
            !time ||
            !duration
        ) {

            alert("Please fill all planner fields.");

            return;

        }


        const plans = getPlans();


        /* UPDATE */

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


            document.querySelector(
                "#planner-form .primary-button"
            ).textContent = "Add to Planner";


            plannerForm.reset();

            renderPlanner();

            return;

        }


        /* ADD */

        const newPlan = {

            id: Date.now(),

            subject: subject,

            topic: topic,

            date: date,

            time: time,

            duration: duration

        };


        plans.push(newPlan);

        savePlans(plans);

        plannerForm.reset();

        renderPlanner();

    });


    /* EDIT / DELETE */

    plannerList.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);


        const plans =
            getPlans();


        /* EDIT */

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


            editingPlannerId = plan.id;


            document.querySelector(
                "#planner-form .primary-button"
            ).textContent = "Update Plan";

        }


        /* DELETE */

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

    });


    renderPlanner();

}
