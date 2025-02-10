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

let currentDate = new Date();
let selectedDay = null;
let events = {};

function renderCalendar() {
    calendarGrid.innerHTML = ""; 
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonth.textContent = `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate)} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
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
    for (let i = 0; i < remainingCells; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.style.backgroundColor = '#808080'; 
        emptyCell.style.border = '8px solid #666666';
        emptyCell.style.cursor = 'default'; // 
        calendarGrid.appendChild(emptyCell);
    }
}

function renderEventList() {
    eventList.innerHTML = ""; 
    if (events[selectedDay]) 
    {
        events[selectedDay].forEach((event, index) => {
            const eventItem = document.createElement("div");
            eventItem.innerHTML = `<input type="checkbox" id="event${index}"><label for="event${index}">${event}</label>`;
            const checkbox = eventItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function(e) {
                if (e.target.checked)  
                {
                    if (addCalendarExp(selectedDay, 30)) 
                    {e.target.checked = true;}

                    else   
                    {
                    e.target.checked = false;
                    alert('Daily exp limit reached for this date (90 exp)');
                    }
                }
                else    
                {removeCalendarExp(selectedDay, 30);}
            });
            eventList.appendChild(eventItem);
        });
    }
}

function saveEvent() 
{
    const eventText = eventInput.value.trim();
    if (eventText) 
    {
        if (!events[selectedDay]) 
            {events[selectedDay] = [];}
        events[selectedDay].push(eventText);
        renderEventList();
        eventInput.value = "";
    }
}

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

saveEventButton.addEventListener("click", saveEvent);

closePopupButton.addEventListener("click", () => {eventPopup.style.display = "none";});
renderCalendar();