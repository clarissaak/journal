function getDateKey(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function CalendarDays(props) {
  let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
          currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
          date: (new Date(firstDayOfMonth)),
          month: firstDayOfMonth.getMonth(),
          number: firstDayOfMonth.getDate(),
          selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
          year: firstDayOfMonth.getFullYear()
      }

      currentDays.push(calendarDay);
  }
  
    return (
    <div className="table-content">
        {
        currentDays.map((day) => {

        const dateKey = getDateKey(day.date);

        const hasEntry =
            props.entries[dateKey] &&
            props.entries[dateKey].length > 0;

        return (
            <div 
                key={day.date.toISOString()}
                className={
                    "calendar-day" +
                    (day.currentMonth ? " current" : "") +
                    (day.selected ? " selected" : "")
                }
                onClick={() => props.changeCurrentDay(day)}
            >
                <p>{day.number}</p>

                {hasEntry && (
                    <span className="entry-indicator">o</span>
                )}
            </div>
        )
        })
      }
    </div>
    )
}

export default CalendarDays;