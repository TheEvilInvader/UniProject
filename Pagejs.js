const resetLevelButton = document.getElementById("resetLevel");
const resetExpButton = document.getElementById("resetExp");
const resetToDoListButton = document.getElementById("resetToDoList");
const resetCalendarEventsButton = document.getElementById("resetCalendarEvents");

function resetLevel() 
{
    localStorage.setItem('level', 1);
    alert("Level has been reset to 1.");
}

function resetExp() 
{
    localStorage.setItem('exp', 0);
    alert("Exp has been reset to 0.");
}

function resetToDoList() 
{
    localStorage.removeItem('easyTasks');
    localStorage.removeItem('mediumTasks');
    localStorage.removeItem('hardTasks');
    alert("To-Do List has been reset.");
}

function resetCalendarEvents() 
{
    localStorage.removeItem('events');
    localStorage.removeItem('dailyExp');
    localStorage.removeItem('checkedEvents');
    alert("Calendar Events have been reset.");
}

if (resetLevelButton && resetExpButton && resetToDoListButton && resetCalendarEventsButton) 
{
    resetLevelButton.addEventListener("click", resetLevel);
    resetExpButton.addEventListener("click", resetExp);
    resetToDoListButton.addEventListener("click", resetToDoList);
    resetCalendarEventsButton.addEventListener("click", resetCalendarEvents);
} 
else 
{console.error("Reset buttons not found!");}