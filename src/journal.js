import CalendarDays from "./calendarDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";
import './journal.css'

const MonthButton = forwardRef(({ value, onClick }, ref) => (
    <h1
        ref={ref}
        onClick={onClick}
        className="calendar-title"
    >
        {value}
    </h1>
));

function Journal() {

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

    const [currentDay, setCurrentDay] = useState(new Date());
    

    function changeCurrentDay(day) {
        setCurrentDay(new Date(day.year, day.month, day.number));
    }

    function getDateKey(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    const [inputEntry, setInputEntry] = useState("");
    const [entries, setEntries] = useState({});
    const currentDateKey = getDateKey(currentDay);

    function addEntry() {
        if (inputEntry.trim() === "") {
            console.warn("Please enter an entry.");
            return;
        }

        const newEntry = {
            text: inputEntry
        };

        setEntries(prevEntries => ({
            ...prevEntries,
            [currentDateKey]: [
                ...(prevEntries[currentDateKey] || []),
                newEntry
            ]
        }));

        setInputEntry("");
    }

    const todaysEntries = entries[currentDateKey] || [];

    const [showMonthPicker, setShowMonthPicker] = useState(false);

    return (
        <div className="journal">
            <div className="calendar">
                <div className="calendar-header">
                    <DatePicker
                        selected={currentDay}
                        onChange={(date) => setCurrentDay(date)}
                        showMonthYearPicker
                        dateFormat="MMMM yyyy"
                        customInput={<MonthButton />}
                    />
                </div>
                    <div className="calendar-body">
                        <div className="table-header">
                            {
                            weekdays.map((weekday) => {
                                return <h2 key={weekday} className="weekday"><p>{weekday}</p></h2>
                            })
                            }
                        </div>
                        <CalendarDays 
                            day={currentDay} 
                            changeCurrentDay={changeCurrentDay} 
                            entries={entries}
                        />
                    </div>
                </div>
                <div className="entry-panel">
                    <h2>{months[currentDay.getMonth()]} {currentDay.getDate()}</h2>
                    <div className="entries">
                        <ul placeholder="no events">
                            {todaysEntries.map((entry, index) => (
                                <li key={index}>
                                    {entry.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addEntry();
                    }}>
                        <input
                            type="text"
                            placeholder="Write your entry here..."
                            value={inputEntry}
                            onChange={(e) => setInputEntry(e.target.value)}
                        />

                        <button className="add-btn" type="submit">
                            +
                        </button>
                    </form>
                </div>
            </div>
            )
    
}

export default Journal;