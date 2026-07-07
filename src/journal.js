import { useState } from "react";
import CalendarDays from "./calendarDays";
import './journal.css'

function Journal() {

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

    const [currentDay, setCurrentDay] = useState(new Date());
    

    function changeCurrentDay(day) {
        setCurrentDay(new Date(day.year, day.month, day.number));
    }

    const [inputEntry, setInputEntry] = useState("");
    const [entries, setEntries] = useState({});
    const currentDateKey = currentDay.toISOString().split("T")[0];

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

    return (
        <div className="journal">
            <div className="calendar">
                <div className="calendar-header">
                <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
                </div>
                    <div className="calendar-body">
                        <div className="table-header">
                            {
                            weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                            })
                            }
                        </div>
                        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
                    </div>
                </div>
                <div className="entry-panel">
                    <div className="entries">
                        <h3>{months[currentDay.getMonth()]} {currentDay.getDate()}</h3>
                        {todaysEntries.map((entry, index) => (
                            <p key={index}>{entry.text}</p>
                        ))}
                    </div>
                    <div className="add-entry">
                            <input
                                type="text"
                                placeholder="Write your entry here..."
                                value={inputEntry}
                                onChange={(e) =>
                                    setInputEntry(e.target.value)
                                }
                            />

                            <button className="add-btn" onClick={addEntry}>
                                +
                            </button>
                    </div>
                </div>
            </div>
            )
    
}

export default Journal;