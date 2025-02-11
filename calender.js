const calendarGrid = document.getElementById("calendarGrid");
const currentMonth = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const eventPopup = document.getElementById("eventPopup");
const popupDate = document.getElementById("popupDate");
const eventInput = document.getElementById("eventInput");
const saveEventButton = document.getElementById("saveEvent");
const closePopupButton = document.getElementById("closePopup");
const eventList = document.getElementById("eventList");
const toggleModeButton = document.getElementById("toggleModeButton");

let currentDate = new Date();
let selectedDay = null;
let events = JSON.parse(localStorage.getItem('events')) || {};
let exp = parseInt(localStorage.getItem('exp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
let dailyExp = JSON.parse(localStorage.getItem('dailyExp')) || {};
let checkedEvents = JSON.parse(localStorage.getItem('checkedEvents')) || {};
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

function addExp(amount, date) 
{
    if (!dailyExp[date]) 
        {dailyExp[date] = 0;}
    if (dailyExp[date] + amount <= 90) 
        {
        dailyExp[date] += amount;
        exp += amount;
        if (exp >= 100) 
        {
            level += 1;
            exp = exp - 100;
            alert(`Level Up! You are now level ${level}`);
        }
        localStorage.setItem('exp', exp);
        localStorage.setItem('level', level);
        localStorage.setItem('dailyExp', JSON.stringify(dailyExp)); // Save dailyExp to localStorage
        updateProgressBar();
    } 
    else 
    {
        alert("Daily exp limit reached (90 exp per day)");
        return false;
    }
}

function removeExp(amount, date) 
{
    if (dailyExp[date]) 
    {
        dailyExp[date] -= amount;
        exp -= amount;
        if (exp < 0) {exp = 0;}
        localStorage.setItem('exp', exp);
        localStorage.setItem('dailyExp', JSON.stringify(dailyExp)); // Save dailyExp to localStorage
        updateProgressBar();
    }
}

function renderCalendar() 
{
    calendarGrid.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonth.textContent = `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate)} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => 
    {
        const dayHeader = document.createElement("div");
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.backgroundColor = '#4564E1';
        dayHeader.style.color = 'white';
        calendarGrid.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay; i++) 
    {
        const emptyCell = document.createElement("div");
        emptyCell.style.backgroundColor = '#808080';
        emptyCell.style.border = '8px solid #666666';
        emptyCell.style.cursor = 'default';
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) 
    {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;
        dayCell.addEventListener("click", () => {
            selectedDay = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            popupDate.textContent = `Add Event for ${selectedDay}`;
            renderEventList();
            eventPopup.style.display = "flex";
        });
        calendarGrid.appendChild(dayCell);
    }
    const totalCells = calendarGrid.children.length;
    const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
    for (let i = 0; i < remainingCells; i++) 
    {
        const emptyCell = document.createElement("div");
        emptyCell.style.backgroundColor = '#808080';
        emptyCell.style.border = '8px solid #666666';
        emptyCell.style.cursor = 'default';
        calendarGrid.appendChild(emptyCell);
    }
}

function renderEventList() 
{
    eventList.innerHTML = "";
    if (events[selectedDay]) 
        {
        events[selectedDay].forEach((event, index) => 
            {
            const eventItem = document.createElement("div");
            eventItem.innerHTML = `<input type="checkbox" id="event${index}" ${checkedEvents[selectedDay]?.[index] ? 'checked' : ''}>
                                   <label for="event${index}">${event}</label>`;
            const checkbox = eventItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function(e) {
                if (deleteMode) return;
                if (e.target.checked) 
                    {addExp(30, selectedDay);} 
                else 
                {removeExp(30, selectedDay);}
                if (!checkedEvents[selectedDay]) 
                {checkedEvents[selectedDay] = [];}
                checkedEvents[selectedDay][index] = e.target.checked;
                localStorage.setItem('checkedEvents', JSON.stringify(checkedEvents));
            });
            eventItem.addEventListener('click', (e) => 
            {
                if (!deleteMode) return;
                e.stopPropagation();
                const contributed = dailyExp[selectedDay] >= (index + 1) * 30;
                if (contributed) 
                    {removeExp(30, selectedDay);}
                events[selectedDay].splice(index, 1);
                checkedEvents[selectedDay].splice(index, 1);
                const maxPossibleExp = events[selectedDay].length * 30;
                if (dailyExp[selectedDay] > maxPossibleExp) 
                {
                    const overExp = dailyExp[selectedDay] - maxPossibleExp;
                    dailyExp[selectedDay] = maxPossibleExp;
                    exp -= overExp;
                    if (exp < 0) exp = 0;
                    localStorage.setItem('exp', exp);
                }
                if (events[selectedDay].length === 0) 
                {
                    delete events[selectedDay];
                    delete dailyExp[selectedDay];
                    delete checkedEvents[selectedDay];
                }
                localStorage.setItem('events', JSON.stringify(events));
                localStorage.setItem('dailyExp', JSON.stringify(dailyExp));
                localStorage.setItem('checkedEvents', JSON.stringify(checkedEvents));
                renderEventList();
                updateProgressBar();
            });
            eventList.appendChild(eventItem);
        });
    }
}

toggleModeButton.addEventListener('click', function() 
{
    deleteMode = !deleteMode;
    toggleModeButton.textContent = deleteMode ? "Normal Mode" : "Delete Mode";
});

function saveEvent() 
{
    const eventText = eventInput.value.trim();
    if (eventText) 
        {
        if (!events[selectedDay]) 
            {events[selectedDay] = [];}
        events[selectedDay].push(eventText);
        localStorage.setItem('events', JSON.stringify(events));
        renderEventList();
        eventInput.value = "";
    }
}

prevMonthButton.addEventListener("click", () => 
{
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => 
{
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

saveEventButton.addEventListener("click", saveEvent);

closePopupButton.addEventListener("click", () => {eventPopup.style.display = "none";});

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    updateProgressBar();
    if (selectedDay) 
        {renderEventList();}
});