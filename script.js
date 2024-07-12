let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYearElement = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

function updateCalendar() {
    calendarBody.innerHTML = "";
    const firstDay = (new Date(currentYear, currentMonth)).getDay();
    const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    monthYearElement.innerText = `${monthNames[currentMonth]} ${currentYear}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);

                const today = new Date();
                today.setDate(today.getDate() + 1);  // Start from tomorrow
                const startDate = new Date(today);
                startDate.setDate(today.getDate() + 30);

                const cellDate = new Date(currentYear, currentMonth, date);

                if (cellDate >= today && cellDate <= startDate) {
                    cell.classList.add("highlighted");
                    cell.onclick = function() {
                        openModal();
                    };
                }

                date++;
            }
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function prevMonth() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    updateCalendar();
}

function nextMonth() {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    updateCalendar();
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function updateProgress() {
    const tasks = document.querySelectorAll('.task-item');
    const totalTasks = tasks.length;
    let completedTasks = 0;

    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        const percentage = task.querySelector('.percentage');
        if (checkbox.checked) {
            completedTasks++;
        }
    });

    tasks.forEach(task => {
        const percentage = task.querySelector('.percentage');
        percentage.textContent = `${Math.round((completedTasks / totalTasks) * 100)}%`;
    });
}

updateCalendar();