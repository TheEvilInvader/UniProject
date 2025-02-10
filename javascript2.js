const easyInput = document.getElementById("easyInput");
const addEasyTaskButton = document.getElementById("addEasyTask");
const easyTaskList = document.getElementById("easyTaskList");
const mediumInput = document.getElementById("mediumInput");
const addMediumTaskButton = document.getElementById("addMediumTask");
const mediumTaskList = document.getElementById("mediumTaskList");
const hardInput = document.getElementById("hardInput");
const addHardTaskButton = document.getElementById("addHardTask");
const hardTaskList = document.getElementById("hardTaskList");

function addTask(taskInput, taskList) 
{
    const taskText = taskInput.value.trim();
    if (taskText) 
    {
        const taskItem = document.createElement("div");
        taskItem.innerHTML = `
            <input type="checkbox" id="task${taskList.children.length}">
            <label for="task${taskList.children.length}">${taskText}</label>`;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        addTaskEventListeners(taskItem, taskList);
    }
}

function addTaskEventListeners(taskItem, taskList) 
{
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function(e) 
    {
        const difficulty =  taskList.id.includes('easy') ? 25 :
                            taskList.id.includes('medium') ? 35 : 50;
        if (e.target.checked) 
            {
            addExp(difficulty);
            } 
        else 
            {
            removeExp(difficulty);
            }
    });
}

addEasyTaskButton.addEventListener("click", () => {addTask(easyInput, easyTaskList);});
addMediumTaskButton.addEventListener("click", () => {addTask(mediumInput, mediumTaskList);});
addHardTaskButton.addEventListener("click", () => {addTask(hardInput, hardTaskList);});