const easyInput = document.getElementById("easyInput");
const addEasyTaskButton = document.getElementById("addEasyTask");
const easyTaskList = document.getElementById("easyTaskList");
const mediumInput = document.getElementById("mediumInput");
const addMediumTaskButton = document.getElementById("addMediumTask");
const mediumTaskList = document.getElementById("mediumTaskList");
const hardInput = document.getElementById("hardInput");
const addHardTaskButton = document.getElementById("addHardTask");
const hardTaskList = document.getElementById("hardTaskList");
const toggleModeButton = document.getElementById("toggleModeButton");

let exp = parseInt(localStorage.getItem('exp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
let deleteMode = false;

function updateProgressBar() 
{
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const levelDisplay = document.getElementById("levelDisplay");
    levelDisplay.textContent = level;
    const progress = (exp % 100) / 100 * 360;
    progressBar.style.background = `conic-gradient(#4564E1 ${progress}deg, #eee ${progress}deg 360deg)`;
    progressText.textContent = `${exp % 100}/100`;
}

function addExp(amount) 
{
    exp += amount;
    if (exp >= 100) 
    { 
        level += 1;
        exp = exp - 100;
        alert(`Level Up! You are now level ${level}`);
    }
    localStorage.setItem('exp', exp);
    localStorage.setItem('level', level);
    updateProgressBar();
}

function removeExp(amount) 
{
    exp -= amount;
    if (exp < 0) exp = 0;
    localStorage.setItem('exp', exp);
    updateProgressBar();
}

function addTask(taskInput, taskList) 
{
    const taskText = taskInput.value.trim();
    if (taskText) 
    {
        const taskItem = document.createElement("div");
        taskItem.innerHTML = 
            `<input type="checkbox" id="task${taskList.children.length}">
            <label for="task${taskList.children.length}">${taskText}</label>`;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        addTaskEventListeners(taskItem, taskList);
    }
}
function addTaskEventListeners(taskItem, taskList) {
    const checkbox = taskItem.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function(e) {
        const difficulty = taskList.id.includes('easy') ? 25 :taskList.id.includes('medium') ? 50 : 75;
        if (deleteMode) 
        {
            if (checkbox.checked) 
                {removeExp(difficulty);}
            taskItem.remove();
        } 
        else 
        {
            if (e.target.checked) {addExp(difficulty);} 
            else {removeExp(difficulty);}
        }
    });
}
toggleModeButton.addEventListener('click', function() 
{
    deleteMode = !deleteMode;
    toggleModeButton.textContent = deleteMode ? "Normal Mode" : "Delete Mode";});

addEasyTaskButton.addEventListener("click", () => {addTask(easyInput, easyTaskList);});
addMediumTaskButton.addEventListener("click", () => {addTask(mediumInput, mediumTaskList);});
addHardTaskButton.addEventListener("click", () => {addTask(hardInput, hardTaskList);});

updateProgressBar();