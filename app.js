// Mảng để lưu trữ task
let tasks = [];
let editIndex = -1;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");

function addTask(taskName) {
    tasks.push(taskName);
    renderTask();
}

function renderTask() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const editButton = document.createElement("button");
        editButton.textContent = "Sửa";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => {
            editTask(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            deleteTask(index);
        })

        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

function showError(message) {
    errorMsg.textContent = message;
}

function clearError() {
    errorMsg.textContent = "";
}

function clearInput() {
    taskInput.value = '';
}

function editTask(index) {
    taskInput.value = tasks[index];
    addTaskBtn.textContent = "Cập nhập công việc";
    editIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTask();
}

addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();

    if (taskName === '') {
        showError("Vui lòng nhập vào nội dung công việc");
    } else if (taskName.length > 30) {
        showError("Vui lòng nhập Nội dung công việc có độ dài nhỏ hơn 30 ký tự");
    } else {
        clearError();
        
        if (editIndex === -1) {
            addTask(taskName);
        } else {
            tasks[editIndex] = taskName;
            editIndex = -1;
            addTaskBtn.textContent = "Thêm công việc";
            
        }
        
        clearInput();
        renderTask();
    }
});

