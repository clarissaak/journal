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

/**    const [inputEntry, setInputEntry] = useState("");
    const [entries, setEntries] = useState([]);

    function addEntry() {
        if (inputEntry.trim() === "") {
            console.warn("Please enter an entry.");
            return;
        }

        if (entries.length >= 7) {
            console.warn("Maximum of 7 entries.");
            return;
        }

        const newEntry = {
            text: inputEntry,
            completed: false
        };

        setEntries([...entries, newEntry]);
        setInputEntry("");
    }
 */   

    

    
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

            </div>
            )
    
}

export default Journal;